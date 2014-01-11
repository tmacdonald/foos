Foos::Application.routes.draw do
  devise_for :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  get 'ladder', to: redirect('/#ladder')
  get 'rankings', to: redirect('/#rankings')

  namespace :api do
    resources :teams, defaults: { :format => 'json' } do 
      resources :games, 
        controller: :team_games,
        only: [:index],
        defaults: { :format => 'json' } do 
          get 'recent', on: :collection
        end

      resources :streaks,
        controller: :team_streaks,
        only: [:index],
        defaults: { :format => 'json' } do
          get 'current', on: :collection
        end

      resources :stats,
        controller: :team_stats,
        only: [:index],
        defaults: { :format => 'json' }
    end

    resources :games, 
      only: [:index, :show, :create, :destroy],
      defaults: { :format => 'json' } do 
        get 'calculate', on: :collection
      end

    resources :users,
      only: [:show],
      defaults: { :format => 'json' } do
        get 'profile', on: :collection
      end

    resources :challenges, defaults: { :format => 'json' }
  end

  get '/teams/:id', to: redirect('/#/teams/%{id}')

  get 'games/new', to: redirect('/#/games/new')

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
