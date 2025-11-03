FactoryBot.define do
  factory :order_item do
    transient do
      order { nil }
    end
    
    after(:build) do |order_item, evaluator|
      ord = evaluator.order || create(:order)
      order_item[:order_ref_id] = ord.id
    end
    association :product
    product_name { product.name }
    product_image_url { nil }
    quantity { 1 }
    unit_price { 100.0 }
    total_price { quantity * unit_price }
  end
end


