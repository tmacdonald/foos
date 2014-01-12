class Challenge < ActiveRecord::Base
  belongs_to :challenger, class_name: "Team"
  belongs_to :challengee, class_name: "Team"

  validates :challenger, presence: true
  validates :challengee, presence: true

  def self.filter(attributes)
    attributes.inject(self.all) do |scope, (key, value)|
      return scope if value.blank?
      case key.to_sym
      when :challenger
        scope.where('challenger_id = ?', value)
      when :challengee
        scope.where('challengee_id = ?', value)
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
