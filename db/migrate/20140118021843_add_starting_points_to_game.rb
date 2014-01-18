class AddStartingPointsToGame < ActiveRecord::Migration
  def change
    add_column :games, :team1points, :integer
    add_column :games, :team2points, :integer
  end
end
