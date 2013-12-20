class Api::TeamsController < ApplicationController

  before_action :set_team, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /teams
  def index
    @teams = Team.all
  end

  #GET /teams/1
  def show
  end

  # POST /teams
  def create
    @team = Team.new(team_params)

    rank = Team.maximum('ladder_rank')
    @team.ladder_rank = rank.nil? ? 1 : (rank + 1)

    if @team.save
      render action: 'show', status: :created, location: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /teams/1
  def update
    if @team.update(team_params)
      head :no_content
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teams/1
  def destroy
    @team.destroy
    head :no_content
  end

  private
    def set_team
      @team = Team.find(params[:id])
    end

    def team_params
      params.require(:team).permit(:name)
    end
end
