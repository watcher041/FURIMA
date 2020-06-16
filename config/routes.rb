
Rails.application.routes.draw do

  # deviseで使用
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  # deviseにaddressパスを追加
  devise_scope :user do
    get 'addresses', to: 'users/registrations#new_address'
    post 'addresses', to: 'users/registrations#create_address'
  end

  root "homes#index"

  resources :categories, only: [:index,:show]

  resources :users

end
