class Game < ActiveRecord::Base
  belongs_to :player1
  belongs_to :player2
end
