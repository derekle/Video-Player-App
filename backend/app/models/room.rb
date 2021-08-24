class Room < ApplicationRecord
    has_one :playlist
    has_many :users
    has_many :songs, through: :playlist
end
