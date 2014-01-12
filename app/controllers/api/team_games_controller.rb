class Api::TeamGamesController < ApplicationController

  before_action :set_game, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /teams/:team_id/games
  def index
    @games = Game.filter(params).where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id]).includes(:team1, :team2)
    response.headers['X-Total-Resources'] = Game.where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id]).count.to_s
    render 'api/games/index'
  end
end
