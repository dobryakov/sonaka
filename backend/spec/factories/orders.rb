FactoryBot.define do
  factory :order do
    association :customer
    order_number { "ORD-#{SecureRandom.hex(4)}" }
    status { %w[paid completed].sample }
    currency { 'RUB' }
    exchange_rate { 1.0 }
    total_amount { 0 }
    item_count { 1 }
    order_date { Date.today }
    has_partial_refund { false }
  end
end


