class TeamsController < ApplicationController

  before_action :set_team, only: [:show, :edit, :update, :destroy]

  # GET /teams
  def index
    @teams = Team.order(ladder_rank: :asc)
  end

  # GET /teams/new
  def new
    @team = Team.new
  end

  # GET /teams/1/edit
  def edit
  end

  #GET /teams/1
  def show
    @recent_games = Game.where("team1_id = ? OR team2_id = ?", @team.id, @team.id).order(created_at: :desc)
  end

  # POST /teams
  def create
    @team = Team.new(team_params)

    @team.ladder_rank = Team.maximum('ladder_rank') + 1

    if @team.save
      redirect_to teams_url, notice: 'Team was successfully created.'
    else
      render action: 'new'
    end
  end

  # PUT/PATCH /teams/1
  def update
    if @team.update(team_params)
      redirect_to teams_url, notice: 'Team was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /teams/1
  def destroy
    @team.destroy
    redirect_to teams_url
  end

  private
    def set_team
      @team = Team.find(params[:id])
    end

    def team_params
      params.require(:team).permit(:name)
    end
end
