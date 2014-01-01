json.extract! @team, :id, :name, :ladder_rank, :points
json.stats @team.stats, :wins, :losses, :current_streak, :longest_win_streak, :longest_loss_streak