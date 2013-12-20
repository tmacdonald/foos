class RenameTeamUsersTable < ActiveRecord::Migration
  def change
    rename_table :team_users, :teams_users
  end
end
