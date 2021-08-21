class UsersController < ApplicationController
  def index
    users = User.all
    render json: users, except: [:created_at, :updated_at]
  end

  def create
  end

  def show
    render json: get_user, except: [:created_at, :updated_at]
  end

  def destroy
    get_user.destroy
  end

  private
  def get_user
    user = User.find_by(id: params[:id])
  end
end
