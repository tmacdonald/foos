class Api::TeamsController < ApplicationController

  before_action :set_team, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /teams
  def index
    @teams = Team.includes(:stats, :users).order(:name)
  end

  # GET /teams/ladder
  def ladder
    @teams = Team.includes(:users).order(:ladder_rank)
    render 'index'
  end

  # GET / teams/rankings
  def rankings
    @teams = Team.includes(:stats, :users).order(points: :desc)
    render 'index'
  end

  # GET /teams/1
  def show
  end

  # POST /teams
  def create
    @team = Team.new(team_params)

    rank = Team.maximum('ladder_rank')
    @team.ladder_rank = rank.nil? ? 1 : (rank + 1)

    if @team.save
      @team.stats = TeamStats.new :wins => 0, :losses => 0, :current_streak => 0, :longest_win_streak => 0, :longest_loss_streak => 0

      render action: 'show', status: :created
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /teams/1
  def update
    if @team.update(team_params)
      head :no_content
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teams/1
  def destroy
    @team.destroy
    head :no_content
  end

  private
    def set_team
      @team = Team.includes(:stats).references(:stats).find(params[:id])
    end

    def team_params
      params.require(:team).permit(:name)
    end
end
