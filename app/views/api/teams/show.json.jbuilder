json.extract! @team, :id, :name, :ladder_rank, :points
json.stats @team.stats, :wins, :losses, :current_streak
json.users @team.users, :id