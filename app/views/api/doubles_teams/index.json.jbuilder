json.array!(@teams) do |team|
  json.extract! team, :id, :team1, :team2, :wins, :losses
  json.url api_doubles_team_url(team, format: :json)
end