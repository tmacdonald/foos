class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name

      t.timestamps
    end

    create_table :team_users do |t|
      t.belongs_to :user
      t.belongs_to :team
    end
  end
end
