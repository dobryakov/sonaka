FactoryBot.define do
  factory :order_item do
    association :order
    association :product
    product_name { product.name }
    product_image_url { nil }
    quantity { 1 }
    unit_price { 100.0 }
    total_price { quantity * unit_price }
  end
end


