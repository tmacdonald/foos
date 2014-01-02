class Challenge < ActiveRecord::Base
  belongs_to :challenger, class_name: "Team"
  belongs_to :challengee, class_name: "Team"

  validates :challenger, presence: true
  validates :challengee, presence: true
end
