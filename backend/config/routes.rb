Rails.application.routes.draw do
  resources :songs
  resources :users
  resources :playlists
  resources :rooms
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
