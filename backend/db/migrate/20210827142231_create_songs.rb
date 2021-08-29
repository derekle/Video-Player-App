class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.belongs_to :playlist, null: false, foreign_key: true
      t.string :source

      t.timestamps
    end
  end
end
