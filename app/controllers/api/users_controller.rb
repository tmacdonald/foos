class Api::UsersController < ApplicationController

  before_filter :authenticate_user!, only: :profile
  before_action :set_user, only: [:show]
  skip_before_action :verify_authenticity_token

  #GET /users/1
  def show
  end

  #GET /users/profile
  def profile
    @user = current_user
    render 'show'
  end

  private
    def set_user
      @user = User.find(params[:id])
    end
end
