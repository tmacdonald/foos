class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.references :team1, index: true
      t.references :team2, index: true

      t.integer :team1score
      t.integer :team2score

      t.timestamps
    end
  end
end
