json.array!(@games) do |game|
  json.extract! game, :id, :team1, :team2, :team1score, :team2score, :points_change, :team1points, :team2points, :played_at
  json.url api_game_url(game, format: :json)
end