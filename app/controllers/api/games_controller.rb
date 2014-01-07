class Api::GamesController < ApplicationController

  before_action :set_game, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /games
  def index
    @games = Game.order(created_at: :desc)

    if (params[:team1_id] && params[:team2_id])
      @games = @games.where('(team1_id = ? AND team2_id = ?) OR (team1_id = ? AND team2_id = ?)', params[:team1_id], params[:team2_id], params[:team2_id], params[:team1_id])
    end
  end

  # GET /games/recent
  def recent 
    @games = Game.order(created_at: :desc).limit(5)
    render 'index'
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
    @game.destroy
    head :no_content
  end

  private
    def set_game
      @game = Game.find(params[:id])
    end

    def game_params
      params.require(:game).permit(:team1_id, :team2_id, :team1score, :team2score)
    end
end
