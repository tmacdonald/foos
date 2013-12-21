class AddPointsToGame < ActiveRecord::Migration
  def change
    add_column :games, :points_change, :integer
  end
end
