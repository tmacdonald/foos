class AddPlayedAtToDoublesGame < ActiveRecord::Migration
  def change
    add_column :doubles_games, :played_at, :timestamp
  end
end
