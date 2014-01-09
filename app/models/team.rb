class Team < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :team1games, :class_name => 'Team', :foreign_key => 'team1_id'
  has_many :team2games, :class_name => 'Team', :foreign_key => 'team2_id'
  has_one :stats, :class_name => 'TeamStats'
  def games 
    team1games + team2games
  end

  validates :name, presence: true

  def self.filter(attributes) 
    attributes.inject(self.all) do |scope, (key, value)|
      return scope if value.blank?
      case key.to_sym
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
end
