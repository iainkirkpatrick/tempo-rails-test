Rails.application.routes.draw do
  resources :activities
  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth'
    resources :people
    resources :activities
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
