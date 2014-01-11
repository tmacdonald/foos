class TeamStats < ActiveRecord::Base
  belongs_to :team

  def calculate_current_streak(params)
    scope = Game.filter(params)
    last_win = scope.where(:team1_id => self.team_id).order(created_at: :desc).first
    last_loss = scope.where(:team2_id => self.team_id).order(created_at: :desc).first

    if last_win.nil? and last_loss.nil?
      0
    elsif last_win.nil?
      -1 * scope.where(:team2_id => self.team_id).count
    elsif last_loss.nil?
      scope.where(:team1_id => self.team_id).count
    elsif last_win.created_at > last_loss.created_at
      scope.where(:team1_id => self.team_id).where('created_at > ?', last_loss.created_at).count
    else
      -1 * scope.where(:team2_id => self.team_id).where('created_at > ?', last_win.created_at).count
    end
  end

  def calculate_wins(params)
    Game.filter(params).where(:team1_id => self.team_id).count
  end

  def calculate_losses(params)
    Game.filter(params).where(:team2_id => self.team_id).count
  end

  def self.calculate(team_id, params)
    stats = TeamStats.new
    stats.team_id = team_id
    stats.wins = stats.calculate_wins params
    stats.losses = stats.calculate_losses params
    stats.current_streak = stats.calculate_current_streak params
    stats
  end
end
