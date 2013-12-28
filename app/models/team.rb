class Team < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :team1games, :class_name => 'Team', :foreign_key => 'team1_id'
  has_many :team2games, :class_name => 'Team', :foreign_key => 'team2_id'
  def games 
    team1games + team2games
  end

  validates :name, presence: true
end
