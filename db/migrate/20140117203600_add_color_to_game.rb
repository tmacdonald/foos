class AddColorToGame < ActiveRecord::Migration
  def change
    add_column :games, :team1isBlue, :boolean
  end
end
