import React from 'react';
import { Card } from '../Card/Card';
import { GradientTitle } from '../GradientTitle/GradientTitle';
import styles from './OrderCard.module.css';
import type { OrderSummary } from '../../types/dashboard';

type Props = {
  order: OrderSummary;
  onClick?: () => void;
};

const mapStatus = (status: OrderSummary['status']): 'pending' | 'processing' | 'completed' | 'cancelled' => {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'completed':
      return 'completed';
    case 'cancelled':
      return 'cancelled';
    case 'paid':
    case 'refunded':
    case 'partially_refunded':
    default:
      return 'processing';
  }
};

export function OrderCard({ order, onClick }: Props) {
  const statusClass = mapStatus(order.status);
  const amount = Number(order.total_amount) || 0;

  return (
    <Card className={styles.card} hoverable onClick={onClick}>
      <span className={`${styles.status} ${styles[statusClass]}`} aria-label={order.status} />
      <div>
        <GradientTitle level={3}>
          #{order.order_number}
        </GradientTitle>
        <div className={styles.meta}>
          {order.order_date} • {amount.toFixed(2)} {order.currency} • {order.item_count ?? 0} шт.
        </div>
      </div>
      <div>
        <button className={styles.moreBtn} type="button">Подробнее</button>
      </div>
    </Card>
  );
}

export default OrderCard;


