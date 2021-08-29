- Room
  Name
  has_one: :gallery
  has_many: :users
  has_many: :pictures through: :gallery

- Gallery
  has_many :pictures
  belongs_to :room

- User

Name
belongs_to :room

-Picture
Picture_ID
source = text
belongs_to :room
