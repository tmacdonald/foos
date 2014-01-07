class Game < ActiveRecord::Base
  before_create :calculate_points
  after_create :update_ladder, :update_points, :update_stats

  after_destroy :rollback_ladder, :rollback_points, :rollback_stats

  belongs_to :team1, class_name: "Team", foreign_key: "team1_id"
  belongs_to :team2, class_name: "Team", foreign_key: "team2_id"

  validates :team1, presence: true
  validates :team2, presence: true

  validates :team1score, numericality: { :equal_to => 10 }
  validates :team2score, numericality: { :greater_than_or_equal_to => 0, :less_than => 10 }

  private 

    def calculate_points
      w = self.team1score > self.team2score ? 1 : 0
      gd = (self.team1score - self.team2score).abs

      g = (11 + gd) / 8.0
      g = 1 if gd == 1
      g = 1.5 if gd == 2

      we = 1.0 / ((10 ** (-(self.team1.points - self.team2.points)/400.0)) + 1)
      k = 20

      self.points_change = (k * g * (w - we)).ceil
    end

    def update_ladder
      game = self

      if game.team1.ladder_rank > game.team2.ladder_rank
        temp = game.team1.ladder_rank
        game.team1.update(ladder_rank: game.team2.ladder_rank)
        game.team2.update(ladder_rank: temp)        
      end
    end

    def rollback_ladder
      game = self

      if game.team1.ladder_rank < game.team2.ladder_rank
        temp = game.team1.ladder_rank
        game.team1.update(ladder_rank: game.team2.ladder_rank)
        game.team2.update(ladder_rank: temp)        
      end
    end

    def update_points
      game = self

      game.team1.update(points: game.team1.points + game.points_change)
      game.team2.update(points: game.team2.points - game.points_change)
    end

    def rollback_points
      game = self

      game.team1.update(points: game.team1.points - game.points_change)
      game.team2.update(points: game.team2.points + game.points_change)
    end

    def update_stats
      game = self

      team1_streak = game.team1.stats.current_streak < 0 ? 1 : game.team1.stats.current_streak + 1
      team2_streak = game.team2.stats.current_streak > 0 ? 1 : game.team2.stats.current_streak - 1

      game.team1.stats.update(wins: game.team1.stats.wins + 1, current_streak: team1_streak)
      game.team2.stats.update(losses: game.team2.stats.losses + 1, current_streak: team2_streak)
    end

    def rollback_stats
      game = self

      team1_streak = game.team1.stats.calculate_current_streak
      team2_streak = game.team2.stats.calculate_current_streak

      game.team1.stats.update(wins: game.team1.stats.wins - 1, current_streak: team1_streak)
      game.team2.stats.update(losses: game.team2.stats.losses - 1, current_streak: team2_streak)
    end
end
