# Minimal seed data for local development and tests

require "securerandom"

customer_email = ENV.fetch("SEED_CUSTOMER_EMAIL", "test@sonaka.ru")

customer = Customer.find_or_create_by!(email: customer_email) do |c|
  c.first_name = "Тест"
  c.last_name = "Пользователь"
end

products = [
  { name: "Ортопедическая подушка Premium", slug: "pillow-premium", currency: "RUB", price: 4999.00 },
  { name: "Одеяло из бамбука", slug: "blanket-bamboo", currency: "RUB", price: 2502.00 },
  { name: "Матрас Memory Foam", slug: "mattress-memory", currency: "RUB", price: 12500.00 }
]

products.each do |attrs|
  Product.find_or_create_by!(slug: attrs[:slug]) do |p|
    p.name = attrs[:name]
    p.currency = attrs[:currency]
    p.price = attrs[:price]
  end
end

def next_order_number
  time_part = Time.now.strftime("%Y%m%d")
  rand_part = SecureRandom.hex(2).upcase
  "ORD-#{time_part}-#{rand_part}"
end

3.times do |i|
  order = Order.create!(
    customer: customer,
    order_number: next_order_number,
    status: "completed",
    currency: "RUB",
    exchange_rate: 1.0,
    total_amount: 0,
    item_count: 0,
    order_date: Date.today - i.days,
    has_partial_refund: false
  )

  Product.limit(2).each do |product|
    qty = (1 + i)
    unit = product.price || 1000
    OrderItem.create!(
      order: order,
      product: product,
      product_name: product.name,
      product_image_url: product.primary_image_url,
      quantity: qty,
      unit_price: unit,
      total_price: qty * unit
    )
  end

  totals = order.order_items.sum(:total_price)
  order.update!(total_amount: totals, item_count: order.order_items.count)
end

Order.create!(
  customer: customer,
  order_number: next_order_number,
  status: "cancelled",
  currency: "RUB",
  exchange_rate: 1.0,
  total_amount: 0,
  item_count: 0,
  order_date: Date.today - 10.days,
  has_partial_refund: false
)

Order.create!(
  customer: customer,
  order_number: next_order_number,
  status: "completed",
  currency: "RUB",
  exchange_rate: 1.0,
  total_amount: 1000,
  item_count: 1,
  order_date: Date.today - 5.days,
  has_partial_refund: true
)

puts "Seeds loaded: #{Customer.count} customers, #{Product.count} products, #{Order.count} orders, #{OrderItem.count} items"


