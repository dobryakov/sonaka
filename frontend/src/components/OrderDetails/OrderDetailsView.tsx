import React from 'react';
import type { OrderDetails } from '../../types/order';
import { OrderItemCard } from './OrderItemCard';

type Props = { order: OrderDetails };

export function OrderDetailsView({ order }: Props) {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Заказ {order.order_number}</h1>
      <div style={{ color: '#64748b', marginBottom: 16 }}>
        {new Date(order.order_date).toLocaleDateString()} · {order.status} · {order.item_count} позиций
      </div>
      <div style={{ marginBottom: 16, fontWeight: 600 }}>
        Итого: {Number(order.total_amount).toFixed(2)} {order.currency}
      </div>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8 }}>
        {order.order_items.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}


