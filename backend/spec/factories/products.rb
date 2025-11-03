FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    slug { SecureRandom.hex(8) }
    price { Faker::Commerce.price(range: 10.0..1000.0) }
    currency { 'RUB' }
    is_active { true }
  end
end


