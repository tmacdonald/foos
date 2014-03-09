class Api::DoublesGamesController < ApplicationController

  before_action :set_game, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /doubles_games
  def index
    @games = DoublesGame.filter(params)
    response.headers['X-Total-Resources'] = DoublesGame.count.to_s
  end

  #GET /doubles_games/1
  def show
  end

  # POST /doubles_games
  def create
    @game = DoublesGame.new(doubles_game_params)

    team1 = DoublesTeam.findTeam(params[:winner_team1_id], params[:winner_team2_id])
    if (team1.nil?)
      team1 = DoublesTeam.new
      team1.team1_id = params[:winner_team1_id]
      team1.team2_id = params[:winner_team2_id]
      team1.save
    end

    team2 = DoublesTeam.findTeam(params[:loser_team1_id], params[:loser_team2_id])
    if (team2.nil?)
      team2 = DoublesTeam.new
      team2.team1_id = params[:loser_team1_id]
      team2.team2_id = params[:loser_team2_id]
      team2.save
    end

    logger.debug team1.inspect
    logger.debug team2.inspect

    @game.team1_id = team1.id
    @game.team2_id = team2.id

    if @game.save
      render action: 'show', status: :created
    else 
      render json: { errors: @game.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /doubles_games/1
  def destroy
    @game.destroy
    head :no_content
  end

  private
    def set_game
      @game = DoublesGame.find(params[:id])
    end

    def doubles_game_params
      params.require(:doubles_game).permit(:winner_team1_id, :winner_team2_id, :loser_team1_id, :loser_team2_id, :team2score)
    end
end
