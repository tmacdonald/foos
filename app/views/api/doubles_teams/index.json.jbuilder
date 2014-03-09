json.array!(@doubles_teams) do |doubles_team|
  json.extract! doubles_team, :id, :team1, :team2, :wins, :losses
  json.url api_doubles_team_url(doubles_team, format: :json)
end