# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140118021843) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenges", force: true do |t|
    t.integer  "challenger_id"
    t.integer  "challengee_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "challenges", ["challengee_id"], name: "index_challenges_on_challengee_id", using: :btree
  add_index "challenges", ["challenger_id"], name: "index_challenges_on_challenger_id", using: :btree

  create_table "games", force: true do |t|
    t.integer  "team1_id"
    t.integer  "team2_id"
    t.integer  "team1score"
    t.integer  "team2score"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "points_change"
    t.integer  "team1points"
    t.integer  "team2points"
    t.datetime "played_at"
  end

  add_index "games", ["team1_id"], name: "index_games_on_team1_id", using: :btree
  add_index "games", ["team2_id"], name: "index_games_on_team2_id", using: :btree

  create_table "team_stats", force: true do |t|
    t.integer  "team_id"
    t.integer  "current_streak"
    t.integer  "longest_win_streak"
    t.integer  "longest_loss_streak"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "wins",                default: 0
    t.integer  "losses",              default: 0
  end

  add_index "team_stats", ["team_id"], name: "index_team_stats_on_team_id", using: :btree

  create_table "teams", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "points",      default: 500
    t.integer  "ladder_rank", default: 0
  end

  create_table "teams_users", force: true do |t|
    t.integer "user_id"
    t.integer "team_id"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
