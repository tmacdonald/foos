class AddRecordToTeamStats < ActiveRecord::Migration
  def change
    add_column :team_stats, :wins, :integer, :default => 0
    add_column :team_stats, :losses, :integer, :default => 0
  end
end
