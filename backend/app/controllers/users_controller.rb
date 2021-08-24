class UsersController < ApplicationController
  def index
    render json: get_user, except: [:created_at, :updated_at]
  end

  def create
    p params[:name]
    u = User.create!(name: params[:name], room_id: 1)
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
