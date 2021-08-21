class CreatePlaylists < ActiveRecord::Migration[6.1]
  def change
    create_table :playlists do |t|
      t.belongs_to :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
