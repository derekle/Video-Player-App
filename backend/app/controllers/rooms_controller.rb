class RoomsController < ApplicationController
	def index
		rooms = Room.all
		render json: rooms, except: [:created_at, :updated_at]
	end

	def create
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
