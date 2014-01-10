class Api::TeamStreaksController < ApplicationController

  # GET /teams/:team_id/streaks
  def index
    @games = Game.where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id]).includes(:team1, :team2).order(created_at: :desc)
    render 'api/games/index'
  end

  # GET /teams/:team_id/streaks/current
  def current
    streak = 0
    team_id = params[:team_id].to_i
    streak_scope = scope params
    game = streak_scope.where("team1_id = ? OR team2_id = ?", team_id, team_id).order(created_at: :desc).last
    unless game.nil?
      if game.team1_id == team_id
        last_loss = streak_scope.where(:team2_id => team_id).order(created_at: :desc).last
        if last_loss.nil?
          streak = streak_scope.where("team1_id = ? OR team2_id = ?", team_id, team_id).count
        else
          streak = streak_scope.where("team1_id = ?", team_id).where('created_at > ?', last_loss.created_at).count
        end
      else
        last_win = streak_scope.where(:team1_id => team_id).order(created_at: :desc).last
        if last_win.nil?
          streak = -streak_scope.where("team1_id = ? OR team2_id = ?", team_id, team_id).count
        else
          streak = -streak_scope.where("team2_id = ?", team_id).where('created_at > ?', last_win.created_at).count
        end
      end
    end
    render :json => streak
  end

  private
    def scope(attributes)
      attributes.inject(Game.order(created_at: :desc)) do |scope, (key, value)|
        return scope if value.blank?
        case key.to_sym
        when :opponent
          scope.where('team1_id = ? OR team2_id = ?', value, value)
        else
          scope
        end
      end
    end
end
