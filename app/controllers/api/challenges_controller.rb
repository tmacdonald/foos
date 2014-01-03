class Api::ChallengesController < ApplicationController

  before_action :set_challenge, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /challenges
  def index
    @challenges = Challenge.all
  end

  #GET /challenges/1
  def show
  end

  # POST /challenges
  def create
    @challenge = Challenge.new(challenge_params)
    @challenge.challenger = current_user.teams.first

    if @challenge.save
      render action: 'show', status: :created
    else
      render json: @challenge.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /challenges/1
  def update
    if @challenge.update(challenge_params)
      head :no_content
    else
      render json: @challenge.errors, status: :unprocessable_entity
    end
  end

  # DELETE /challenges/1
  def destroy
    @challenge.destroy
    head :no_content
  end

  private
    def set_challenge
      @challenge = Challenge.find(params[:id])
    end

    def challenge_params
      params.require(:challenge).permit(:challengee_id)
    end
end
