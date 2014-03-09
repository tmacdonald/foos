class DoublesTeam < ActiveRecord::Base
  has_one :team1
  has_one :team2

  def self.filter(attributes)
    attributes.inject(self.all) do |scope, (key, value)|
      return scope if value.blank?
      case key.to_sym
      when :offset
        scope.offset value
      when :limit
        scope.limit value
      when :order
        order, attribute = value[0], value[1, value.length]
        order = (order == "+") ? :asc : :desc
        scope.order "#{attribute}# #{order}"
      else
        scope
    end
  end

end