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

  def self.filter(attributes)
    attributes.inject(self.all) do |scope, (key, value)|
      return scope if value.blank?
      case key.to_sym
      when :team
        scope.where('team1_id = ? OR team2_id = ?', value, value)
      when :teams
        teams = value.split(',')
        scope.where(:team1_id => teams).where(:team2_id => teams)
      when :offset
        scope.offset(value)
      when :limit
        scope.limit(value)
      when :order # order=(+|-)field
        order, attribute = value[0], value[1, value.length]
        order = (order == "+") ? :asc : :desc
        scope.order("#{attribute} #{order}")
      else
        scope
      end
    end
  end

  def self.calculate_points(score1, score2, points1, points2)
    w = score1 > score2 ? 1 : 0
    gd = (score1 - score2).abs

    g = (11 + gd) / 8.0
    g = 1 if gd == 1
    g = 1.5 if gd == 2

    we = 1.0 / ((10 ** (-(points1 - points2)/400.0)) + 1)
    k = 20

    (k * g * (w - we)).ceil
  end

  private 

    def calculate_points
      self.points_change = Game.calculate_points(self.team1score, self.team2score, self.team1.points, self.team2.points)
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
      team2_streak = game.team2.stats.current_streak > 0 ? -1 : game.team2.stats.current_streak - 1

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
