class DashboardSerializer < ActiveModel::Serializer
  attributes :orders, :totals, :pagination, :previously_purchased_items

  def orders
    ActiveModelSerializers::SerializableResource.new(
      object[:orders], each_serializer: OrderSerializer
    )
  end

  def totals
    {
      total_orders_count: object[:totals].total_orders_count,
      total_amount_ordered: object[:totals].total_amount_ordered,
      currency: object[:totals].currency
    }
  end

  def pagination
    object[:pagination]
  end

  def previously_purchased_items
    object[:totals].previously_purchased_items
  end
end


