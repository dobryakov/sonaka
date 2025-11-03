import React from 'react';
import type { OrderSummary } from '../../types/dashboard';

type Props = { orders: OrderSummary[] };

export function OrdersList({ orders }: Props) {
  if (!orders.length) return <div>Нет заказов</div>;
  return (
    <ul>
      {orders.map((o) => {
        const amount = Number(o.total_amount) || 0;
        return (
          <li key={o.id}>
            <strong>{o.order_number}</strong> — {o.order_date} — {o.status} — {amount.toFixed(2)} {o.currency}
          </li>
        );
      })}
    </ul>
  );
}


