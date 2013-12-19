class GamesController < ApplicationController

  before_action :set_game, only: [:show, :edit, :update, :destroy]

  # GET /games
  def index
    @games = Game.all
  end

  # GET /games/new
  def new
    @game = Game.new
    @teams = Team.all
  end

  # GET /games/1/edit
  def edit
  end

  #GET /games/1
  def show
  end

  # POST /games
  def create
    @game = Game.new(game_params)

    if @game.save

      point_change = calculate_points_change(@game.team1.points, @game.team2.points, @game.team1score, @game.team2score)

      logger.debug "Point change: #{point_change}"

      if (@game.team1score > @game.team2score && @game.team1.ladder_rank > @game.team2.ladder_rank) ||
        (@game.team1score < @game.team2score && @game.team1.ladder_rank < @game.team2.ladder_rank)

          temp = @game.team1.ladder_rank
          @game.team1.update(ladder_rank: @game.team2.ladder_rank)
          @game.team2.update(ladder_rank: temp)
      end

      @game.team1.update(points: @game.team1.points + point_change)
      @game.team2.update(points: @game.team2.points - point_change)

      redirect_to teams_url, notice: 'Game was successfully created.'
    else
      render action: 'new'
    end
  end

  # PUT/PATCH /games/1
  def update
    if @game.update(game_params)
      redirect_to @game, notice: 'Game was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy
    redirect_to games_url
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
