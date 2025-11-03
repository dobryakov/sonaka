Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # US1: Dashboard endpoint (to be implemented in Phase 3)
      get "/dashboard", to: "dashboard#index"

      # US3: Order details endpoint (to be implemented in Phase 5)
      get "/orders/:order_id", to: "orders#show"

      # US2: Previously purchased endpoint (to be implemented in Phase 4)
      get "/previously_purchased", to: "previously_purchased#index"
    end
  end
end


