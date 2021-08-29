class SongsController < ApplicationController
def index
    songs = Song.all

    render json: songs, except: [:created_at, :updated_at]
  end

  def create
    p params
    s = Song.create!(source:params[:source], playlist_id:params[:playlist_id])
    render json: s, except: [:created_at, :updated_at]
  end

  def show
    render json: get_song, except: [:created_at, :updated_at]
  end

  def destroy
    get_song.destroy
  end

  private
  def get_song
    song = Song.find_by(id: params[:id]) || User.all
  end
end
