class Api::TeamStreaksController < ApplicationController

  # GET /teams/:team_id/streaks
  def index

    minimum_streak = 2
    unless params[:minimum].nil?
      minimum_streak = params[:minimum].to_i
    end

    unless params[:limit].nil?
      limit = params[:limit].to_i
      params.delete :limit
    end

    games = Game.filter(params).where("team1_id = ? OR team2_id = ?", params[:team_id], params[:team_id])
    
    team_id = params[:team_id].to_i
    current_streak = 0
    streaks = Array.new

    games.each do |game|
      logger.debug game.team1_id
      unless current_streak == 0
        if current_streak > 0 && game.team1_id == team_id
          current_streak = current_streak + 1
        elsif current_streak < 0 && game.team2_id == team_id
          current_streak = current_streak - 1
        else
          streaks.push current_streak if current_streak.abs >= minimum_streak
          current_streak = (game.team1_id == team_id) ? 1 : -1
          if streaks.length == limit
            break
          end
        end 
      else
        current_streak = (game.team1_id == team_id) ? 1 : -1
      end
    end
    streaks.push current_streak if streaks.length < limit

    render :json => streaks
  end

  # GET /teams/:team_id/streaks/current
  def current
    streak = 0
    team_id = params[:team_id].to_i
    streak_scope = Game.filter params
    game = streak_scope.where("team1_id = ? OR team2_id = ?", team_id, team_id).last
    unless game.nil?
      if game.team1_id == team_id
        last_loss = streak_scope.where(:team2_id => team_id).last
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
end
