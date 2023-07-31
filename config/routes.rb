# config/routes.rb

Rails.application.routes.draw do
  get 'homepage/index'
  namespace :api do
    namespace :v1 do
      resources :collaborators, only: [:index, :show, :create, :update, :destroy] do
        resources :vacations, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'

end
