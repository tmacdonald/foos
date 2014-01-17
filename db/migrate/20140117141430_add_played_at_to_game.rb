class AddPlayedAtToGame < ActiveRecord::Migration
  def change
    add_column :games, :played_at, :timestamp
    Game.connection.execute('UPDATE games SET played_at = created_at')
  end
end
