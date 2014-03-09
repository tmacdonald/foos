class AddDoubles < ActiveRecord::Migration
  def change
    create_table :doubles_teams do |t|
      t.references :team1
      t.references :team2

      t.integer :wins, default: 0
      t.integer :losses, default: 0
    end

    create_table :doubles_games do |t|
      t.references :team1, index: true
      t.references :team2, index: true

      t.integer :team2score

      t.timestamps
    end
  end
end
