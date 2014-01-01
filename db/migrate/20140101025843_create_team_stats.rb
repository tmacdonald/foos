class CreateTeamStats < ActiveRecord::Migration
  def change
    create_table :team_stats do |t|
      t.references :team, index: true
      t.integer :current_streak
      t.integer :longest_win_streak
      t.integer :longest_loss_streak

      t.timestamps
    end
  end
end
