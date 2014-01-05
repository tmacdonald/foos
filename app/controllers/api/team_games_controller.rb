class Api::TeamGamesController < ApplicationController

  before_action :set_game, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /teams/:team_id/games
  def index
    @games = Game.where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id]).includes(:team1, :team2).order(created_at: :desc)
    render 'api/games/index'
  end

  # GET /teams/:team_id/games/recent
  def recent
    @games = Game.where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id]).includes(:team1, :team2).order(created_at: :desc).limit(5)
    render 'api/games/index'
  end

end
