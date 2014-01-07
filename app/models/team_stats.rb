class TeamStats < ActiveRecord::Base
  belongs_to :team

  def current_streak
    logger.debug self.team_id

    last_win = Game.where(:team1_id => self.team_id).order(created_at: :desc).first
    last_loss = Game.where(:team2_id => self.team_id).order(created_at: :desc).first

    logger.debug last_win
    logger.debug last_loss

    if last_win.nil? and last_loss.nil?
      0
    elsif last_win.nil?
      -1 * Game.where(:team2_id => self.team_id).count
    elsif last_loss.nil?
      Game.where(:team1_id => self.team_id).count
    elsif last_win.created_at > last_loss.created_at
      Game.where(:team1_id => self.team_id).where('created_at > ?', last_loss.created_at).count
    else
      -1 * Game.where(:team2_id => self.team_id).where('created_at > ?', last_win.created_at).count
    end
  end
end
