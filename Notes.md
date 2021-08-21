- Room
Name
has_one: :playlist
has_many: :users
has_many: :songs through: :playlist

- Playlist
has_many :songs
belongs_to :room

- User

Name
belongs_to :room

-Song
Song_ID
source = text
skipvotes = int
belongs_to :room