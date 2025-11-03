class DashboardTotalsCalculator
  Result = Struct.new(:total_orders_count, :total_amount_ordered, :currency, :previously_purchased_items, keyword_init: true)

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
      currency: @dashboard_currency,
      previously_purchased_items: previously_purchased_items
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

  # Aggregates previously purchased items by product_id across relevant orders
  # Returns array of hashes: { product_id, product_name, product_image_url, total_quantity, last_purchased_date }
  def previously_purchased_items
    # Join order_items and products to get current product info; aggregate quantities
    OrderItem
      .joins(:order)
      .joins("LEFT JOIN products ON products.id = order_items.product_id")
      .where(orders: orders_scope.except(:order))
      .group('order_items.product_id', 'products.name', 'products.primary_image_url')
      .select(
        'order_items.product_id AS product_id',
        'COALESCE(products.name, MAX(order_items.product_name)) AS product_name',
        'products.primary_image_url AS product_image_url',
        'SUM(order_items.quantity) AS total_quantity',
        'MAX(orders.order_date) AS last_purchased_date'
      )
      .map do |row|
        {
          product_id: row.product_id,
          product_name: row.product_name,
          product_image_url: row.respond_to?(:product_image_url) ? row.product_image_url : nil,
          total_quantity: row.total_quantity.to_i,
          last_purchased_date: row.last_purchased_date&.to_date&.iso8601
        }
      end
  end
end


