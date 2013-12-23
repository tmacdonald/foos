json.array!(@teams) do |team|
  json.extract! team, :id, :name, :ladder_rank, :points
  json.url api_team_url(team, format: :json)
end