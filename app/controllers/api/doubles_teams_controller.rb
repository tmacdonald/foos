class Api::DoublesTeamsController < ApplicationController

  before_action :set_team, only: [:show, :edit, :udpate, :destroy]
  skip_before_action :verify_authenticity_token

  # Get /doubles/teams
  def index
    @teams = DoublesTeam.filter(params).includes(:team1, :team2)
  end
end