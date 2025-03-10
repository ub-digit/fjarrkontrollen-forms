Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :sessions, only: [:create] #TODO: :show for ember-simple-auth restore, :delete for session invalidate
    resources :orders, only: [:create]
    resources :pubmed, only: [:show]
    get "scopus/*doi", to: "scopus#show", constraints: { doi: /.*/ }
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
