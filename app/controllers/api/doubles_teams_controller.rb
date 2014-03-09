class Api::DoublesTeamsController < ApplicationController

  before_action :set_team, only: [:show]
  skip_before_action :verify_authenticity_token

  # GET /doubles_teams
  def index
    @doubles_teams = DoublesTeam.filter(params).includes(:team1, :team2)
  end

  # GET /doubles_teams/1
  def show
  end

  private
    def set_team
      @doubles_team = DoublesTeam.find(params[:id])
    end
end