class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_number, :order_date, :status, :total_amount, :currency, :item_count

  has_many :order_items, serializer: OrderItemSerializer
end


