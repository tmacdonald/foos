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
    @game = DoublesGame.new(game_params)

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

    def game_params
      params.require(:game).permit(:winner_team1_id, :winner_team2_id, :loser_team1_id, :loser_team2_id, :team2score)
    end
end
