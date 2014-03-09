json.array!(@games) do |game|
  json.extract! game, :id, :team1, :team2, :team2score, :played_at
  json.url api_doubles_game_url(game, format: :json)
end