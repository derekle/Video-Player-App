class Song < ApplicationRecord
  belongs_to :playlist
  validates :source, presence: true, uniqueness: true
end
