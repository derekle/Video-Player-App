class RoomsController < ApplicationController
	def index
		rooms = Room.all
		render json: rooms, except: [:created_at, :updated_at], include: [:users, :playlist]
	end

	def create
		p params[:name]
		r = Room.create!(name: params[:name])
		pl = Playlist.create!(room_id:r.id)
		render json: r, except: [:created_at, :updated_at], include: [:users, :playlist]
	end

	def show
		render json: get_room, except: [:created_at, :updated_at]
	end

	def destroy
		get_room.destroy
	end

	private
	def get_room
		 Room.find_by(id: params[:id])
	end
end