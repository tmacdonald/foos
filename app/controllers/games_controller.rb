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
      redirect_to @game, notice: 'Game was successfully created.'
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
end
