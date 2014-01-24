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

  # PUT/PATCH /games/1
  def update
    # Get all games that happened after the game being updated
    games_after = Game.where('played_at > ?', @game.played_at).order(played_at: :asc)
    # Get a copy of those games
    games_after_copy = games_after.map do |game|
      game
    end

    # Delete all games that happened after the game being updated
    games_after.destroy_all
    # Delete the game being updated
    @game.destroy
    # Create a new game to replace

    new_game = Game.new(game_params)
    new_game.id = @game.id
    new_game.played_at = @game.played_at
    new_game.save

    games_after_copy.each do |game|
      g = Game.new game.as_json
      g.save
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
