json.array!(@teams) do |team|
  json.extract! team, :id, :name, :wins, :losses
  json.url api_team_url(team, format: :json)
end