class UsersController < ApplicationController
  def index
    render json: get_user, except: [:created_at, :updated_at]
  end

  def create
    p params
    u = User.create!(name: params[:name], room_id: params[:room_id])
    render json: u, except: [:created_at, :updated_at]
  end

  def show
    render json: get_user, except: [:created_at, :updated_at]
  end

  def destroy
    get_user.destroy
  end

  private
  def get_user
    user = User.find_by(id: params[:id]) || User.all
  end
end
