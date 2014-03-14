class Api::TeamsController < ApplicationController

  before_action :set_team, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /teams
  def index
    @teams = Team.filter(params).includes(:stats, :users)
  end

  # GET /teams/1
  def show
  end

  # GET /doubles
  def doubles
    @teams = Team.filter(params).where('wins IS NOT NULL AND losses IS NOT NULL').select('teams.*, sum(d.wins) as wins, sum(d.losses) as losses').joins('left outer join doubles_teams d ON d.team1_id = teams.id OR d.team2_id = teams.id').group('teams.id')
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
