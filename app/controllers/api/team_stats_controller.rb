class Api::TeamStatsController < ApplicationController

  # GET /teams/:team_id/stats
  def index
    @stats = TeamStats.calculate params[:team_id], params
  end
end
