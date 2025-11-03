import React from 'react';
import type { OrderItem } from '../../types/order';

type Props = { item: OrderItem };

export function OrderItemCard({ item }: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ width: 64, height: 64, background: '#f0fdf4', borderRadius: 8, overflow: 'hidden' }}>
        {item.product_image_url ? (
          <img src={item.product_image_url} alt={item.product_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Нет изображения</div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{item.product_name}</div>
        <div style={{ color: '#64748b' }}>
          x{item.quantity} · {Number(item.unit_price).toFixed(2)} · = {Number(item.total_price).toFixed(2)}
        </div>
      </div>
    </div>
  );
}


