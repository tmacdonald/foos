json.array!(@games) do |game|
  json.extract! game, :id, :team1, :team2, :team1score, :team2score, :points_change, :created_at
  json.url game_url(game, format: :json)
end