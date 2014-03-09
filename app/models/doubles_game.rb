class DoublesGame < ActiveRecord::Base
  before_create :update_timestamps
  after_create :update_stats

  after_destroy :rollback_stats

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
      when :team1_id
        scope.where('team1_id = ? OR team2_id = ?', value, value)
      when :team2_id
        scope.where('team1_id = ? OR team2_id = ?', value, value)
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

  private 

    def update_timestamps
      self.played_at = Time.now if self.played_at.nil?
    end

    def update_stats
      game = self

      game.team1.update(wins: game.team1.wins + 1)
      game.team2.update(losses: game.team2.losses + 1)
    end

    def rollback_stats
      game = self

      game.team1.update(wins: game.team1.wins - 1)
      game.team2.update(losses: game.team2.losses - 1)
    end
end
