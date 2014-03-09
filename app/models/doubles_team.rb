class DoublesTeam < ActiveRecord::Base
  belongs_to :team1, class_name: "Team"
  belongs_to :team2, class_name: "Team"

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

  def self.findTeam(team1_id, team2_id)
    DoublesTeam.where('team1_id = ? OR team2_id = ?', team1_id, team1_id).where('team1_id = ? OR team2_id = ?', team2_id, team2_id).first
  end
end