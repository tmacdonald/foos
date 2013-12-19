class AddLadderRankToTeams < ActiveRecord::Migration
  def change
  	add_column :teams, :ladder_rank, :integer, :default => 0
  end
end
