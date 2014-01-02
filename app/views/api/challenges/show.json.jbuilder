json.extract! @challenge, :id
json.challenger @challenge.challenger, :id, :name
json.challengee @challenge.challengee, :id, :name