class Api::GamesController < ApplicationController

  before_action :set_team, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /games
  def index
    @games = Game.all
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

      render action: 'show', status: :created, location: @game
    else
      render json: @game.errors, status: :unprocessable_entity
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
      params.require(:game).permit(:name)
    end
end