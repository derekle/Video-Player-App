class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.string :source
      t.integer :votes
      t.belongs_to :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
