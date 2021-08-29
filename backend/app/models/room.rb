class Room < ApplicationRecord
  has_one :playlist
  has_many :songs, through: :playlist
  has_many :users

  validates :name, presence: true, uniqueness: { case_sensitive: false}

end
