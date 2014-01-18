json.array!(@games) do |game|
  json.extract! game, :id, :team1, :team2, :team1score, :team2score, :points_change, :played_at
  json.url api_game_url(game, format: :json)
end