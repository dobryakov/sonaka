class OrderItemSerializer < ActiveModel::Serializer
  attributes :id,
             :product_id,
             :product_name,
             :product_image_url,
             :quantity,
             :unit_price,
             :total_price
end


