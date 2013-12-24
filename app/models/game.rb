class Game < ActiveRecord::Base
  belongs_to :team1, class_name: "Team", foreign_key: "team1_id"
  belongs_to :team2, class_name: "Team", foreign_key: "team2_id"

  validates :team1, presence: true
  validates :team2, presence: true

  validates :team1score, numericality: { :equal_to => 10 }
  validates :team2score, numericality: { :greater_than_or_equal_to => 0, :less_than => 10 }
end
