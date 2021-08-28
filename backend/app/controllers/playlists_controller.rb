class PlaylistsController < ApplicationController
	def index
		playlist = Playlist.all
		render json: playlist, except: [:created_at, :updated_at], include: [:songs]
	end

	def create
		p params[:name]
		pl = Playlist.create!(room_id:params[:room_id])
		render json: pl, except: [:created_at, :updated_at], include: [ :songs]
	end

	def show
		render json: get_playlist, except: [:created_at, :updated_at], include: [:songs]
	end

	def destroy
		get_playlist.destroy
	end

	private
	def get_playlist
		 Playlist.find_by(id: params[:id])
	end
end
