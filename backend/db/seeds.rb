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
    item_count: 1,
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

cancelled_order = Order.create!(
  customer: customer,
  order_number: next_order_number,
  status: "cancelled",
  currency: "RUB",
  exchange_rate: 1.0,
  total_amount: 0,
  item_count: 1,
  order_date: Date.today - 10.days,
  has_partial_refund: false
)

# Добавим один товар к отменённому заказу, чтобы удовлетворить валидации и согласовать суммы
if (p = Product.first)
  qty = 1
  unit = p.price || 0
  OrderItem.create!(
    order: cancelled_order,
    product: p,
    product_name: p.name,
    product_image_url: p.primary_image_url,
    quantity: qty,
    unit_price: unit,
    total_price: qty * unit
  )
  totals = cancelled_order.order_items.sum(:total_price)
  cancelled_order.update!(total_amount: totals, item_count: cancelled_order.order_items.count)
end

partial_refund_order = Order.create!(
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

# Добавим один товар в заказ с частичным возвратом, чтобы суммы и item_count были непротиворечивы
if (p2 = Product.second || Product.first)
  qty2 = 1
  unit2 = 1000.0
  OrderItem.create!(
    order: partial_refund_order,
    product: p2,
    product_name: p2.name,
    product_image_url: p2.primary_image_url,
    quantity: qty2,
    unit_price: unit2,
    total_price: qty2 * unit2
  )
  totals2 = partial_refund_order.order_items.sum(:total_price)
  partial_refund_order.update!(total_amount: totals2, item_count: partial_refund_order.order_items.count)
end

puts "Seeds loaded: #{Customer.count} customers, #{Product.count} products, #{Order.count} orders, #{OrderItem.count} items"


