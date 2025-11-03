import React from 'react';
import type { OrderSummary } from '../../types/dashboard';
import { OrderCard } from './OrderCard';
import { EmptyState } from '../common/EmptyState';

type Props = { orders: OrderSummary[] };

export function OrdersList({ orders }: Props) {
  if (!orders.length) return <EmptyState title="Заказы" description="У вас пока нет заказов" />;
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} />
      ))}
    </div>
  );
}


