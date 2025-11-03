class DashboardTotalsCalculator
  Result = Struct.new(:total_orders_count, :total_amount_ordered, :currency, keyword_init: true)

  def initialize(customer_id:, dashboard_currency: 'RUB', page: 1, per_page: 20)
    @customer_id = customer_id
    @dashboard_currency = dashboard_currency
    @page = [page.to_i, 1].max
    @per_page = [[per_page.to_i, 1].max, 100].min
  end

  def orders_scope
    Order.where(customer_id: @customer_id).relevant.order(order_date: :desc)
  end

  def paginated_orders
    orders_scope.offset((@page - 1) * @per_page).limit(@per_page)
  end

  def totals
    sum_converted = orders_scope.sum(rounded_sum_expression)
    Result.new(
      total_orders_count: orders_scope.count,
      total_amount_ordered: bank_round(sum_converted, 2),
      currency: @dashboard_currency
    )
  end

  private

  # Use SQL COALESCE(exchange_rate, 1.0) * total_amount to convert into dashboard currency
  def rounded_sum_expression
    Arel.sql('COALESCE(exchange_rate, 1.0) * total_amount')
  end

  # Bankers rounding (half-to-even)
  def bank_round(value, precision)
    BigDecimal(value.to_s).round(precision, BigDecimal::ROUND_HALF_EVEN).to_f
  end
end


