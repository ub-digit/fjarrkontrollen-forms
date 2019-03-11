Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :sessions
  end
  mount_ember_app :frontend, to: "/"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
