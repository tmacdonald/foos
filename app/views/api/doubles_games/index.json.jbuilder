json.array!(@games) do |game|
  json.extract! game, :id, :team1, :team2, :team2score, :played_at
  json.team1 game.team1, :id, :team1, :team2
  json.team2 game.team2, :id, :team1, :team2
  json.url api_doubles_game_url(game, format: :json)
end