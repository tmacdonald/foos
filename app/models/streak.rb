class Streak
  def self.current_streak(params, team_id)
    streak = 0
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
    streak
  end
end