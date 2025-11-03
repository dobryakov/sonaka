import React from 'react';
import type { DashboardTotals } from '../../types/dashboard';
import { StatCard } from './StatCard';

type Props = { totals: DashboardTotals };

export function StatsGrid({ totals }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
      <StatCard title="Всего заказов" value={totals.total_orders_count} />
      <StatCard title="Общая сумма" value={`${Number(totals.total_amount_ordered).toFixed(2)} ${totals.currency}`} />
    </div>
  );
}

export default StatsGrid;


