Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "groups#index"
  resources :users, only: [:index, :edit, :update, :index]
  resources :groups, only: [:new, :edit, :create, :update] do
    resources :messages, only: [:index, :create]
  end
end
