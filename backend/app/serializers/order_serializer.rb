class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_number, :order_date, :status, :total_amount, :currency, :item_count
end


