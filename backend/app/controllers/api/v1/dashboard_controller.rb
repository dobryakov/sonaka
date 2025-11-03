module Api
  module V1
    class DashboardController < ApplicationController
      def index
        customer_id = current_customer_id
        calculator = DashboardTotalsCalculator.new(
          customer_id: customer_id,
          dashboard_currency: dashboard_currency,
          page: params[:page] || 1,
          per_page: params[:per_page] || 20
        )

        orders = calculator.paginated_orders
        totals = calculator.totals
        pagination = build_pagination(calculator)

        render json: { orders: orders, totals: totals, pagination: pagination }, serializer: DashboardSerializer
      end

      private

      def current_customer_id
        # Placeholder: replace with real auth when integrated
        params[:customer_id] || 1
      end

      def dashboard_currency
        'RUB'
      end

      def build_pagination(calculator)
        total_count = calculator.orders_scope.count
        per_page = calculator.instance_variable_get(:@per_page)
        current_page = calculator.instance_variable_get(:@page)
        total_pages = (total_count.to_f / per_page).ceil
        { current_page: current_page, total_pages: total_pages, per_page: per_page }
      end
    end
  end
end


