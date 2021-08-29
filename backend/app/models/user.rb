class User < ApplicationRecord
  belongs_to :room

  validates :name, presence: true
end
