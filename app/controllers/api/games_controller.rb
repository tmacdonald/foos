class Api::GamesController < ApplicationController

  before_action :set_game, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /games
  def index
    @games = Game.filter(params)
    response.headers['X-Total-Resources'] = Game.count.to_s
  end

  # GET /games/calculate?score1=10&score2=4&points1=500&points2=500
  def calculate
    points = Game.calculate_points params[:score1].to_i, params[:score2].to_i, params[:points1].to_i, params[:points2].to_i
    render json: { points: points }, status: :ok
  end

  #GET /games/1
  def show
  end

  # POST /games
  def create
    @game = Game.new(game_params)

    if @game.save
      render action: 'show', status: :created
    else 
      render json: { errors: @game.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /games/1
  def destroy
    count = Game.where('team1_id = ? OR team1_id = ? OR team2_id = ? OR team2_id = ?', @game.team1_id, @game.team2_id, @game.team1_id, @game.team2_id).where('played_at > ?', @game.played_at).count

    if count == 0
      @game.destroy
      head :no_content
    else
      render json: { error: 'Cannot delete game because other games depend on the outcome' }, status: :failed_dependency
    end
  end

  private
    def set_game
      @game = Game.find(params[:id])
    end

    def game_params
      params.require(:game).permit(:team1_id, :team2_id, :team1score, :team2score)
    end
end
