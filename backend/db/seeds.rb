# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Room.create(name: "123abc")
Room.create(name: "xyz321")

5.times do
	u = []
	u << User.create(name: "User_A", room_id: 1)
end

5.times do
	u = []
	u << User.create(name: "user_b", room_id: 2)
end

User.all.each do |x|
	x.update(name: "#{x.name.downcase}_#{x.id}")
	x.save
end