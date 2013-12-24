class Api::GamesController < ApplicationController

  before_action :set_team, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /teams/:team_id/games
  def index
    @games = Game.where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id])
  end

  # GET /teams/:team_id/games/recent
  def recent
    @games = Game.where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id]).order(created_at: :desc).limit(5)
    render 'index'
  end

  #GET /games/1
  def show
  end

  # POST /games
  def create
    @game = Game.new(game_params)

    if @game.valid?
      point_change = calculate_points_change(@game.team1.points, @game.team2.points, @game.team1score, @game.team2score)
      @game.points_change = point_change

      if @game.save

        if (@game.team1score > @game.team2score && @game.team1.ladder_rank > @game.team2.ladder_rank) ||
          (@game.team1score < @game.team2score && @game.team1.ladder_rank < @game.team2.ladder_rank)

            temp = @game.team1.ladder_rank
            @game.team1.update(ladder_rank: @game.team2.ladder_rank)
            @game.team2.update(ladder_rank: temp)
        end

        @game.team1.update(points: @game.team1.points + point_change)
        @game.team2.update(points: @game.team2.points - point_change)

        render action: 'show', status: :created
      else
        render json: { errors: @game.errors.as_json }, status: :unprocessable_entity
      end
    else 
      render json: { errors: @game.errors }, status: :unprocessable_entity
    end

    
  end

  # PUT/PATCH /games/1
  def update
    if @game.update(game_params)
      head :no_content
    else
      render json: @player.errors, status: :unprocessable_entity
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

    def calculate_points_change (points1, points2, score1, score2)
      w = score1 > score2 ? 1 : 0
      gd = (score1 - score2).abs

      g = (11 + gd) / 8.0
      g = 1 if gd == 1
      g = 1.5 if gd == 2

      we = 1.0 / ((10 ** (-(points1 - points2)/400.0)) + 1)
      k = 20

      logger.debug "#{w}, #{g}, #{w}, #{we}"

      (k * g * (w - we)).ceil
    end
end
