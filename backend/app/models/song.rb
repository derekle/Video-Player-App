class Song < ApplicationRecord
  belongs_to :playlist
  validates :source, presence: true, uniqueness: true
  validates_length_of :source, minimum: 43, maximum: 43, allow_blank: false
end
