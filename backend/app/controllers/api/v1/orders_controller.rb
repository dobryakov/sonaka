module Api
  module V1
    class OrdersController < ApplicationController
      def show
        order = Order.includes(:order_items).find(params[:order_id])
        render json: order, serializer: OrderSerializer
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Заказ не найден" }, status: :not_found
      end
    end
  end
end


