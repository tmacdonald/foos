json.array!(@challenges) do |challenge|
  json.extract! challenge, :id
  json.challenger challenge.challenger, :id, :name
  json.challengee challenge.challengee, :id, :name
  json.url api_challenge_url(challenge, format: :json)
end