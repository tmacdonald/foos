class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.references :challenger, index: true
      t.references :challengee, index: true

      t.timestamps
    end
  end
end
