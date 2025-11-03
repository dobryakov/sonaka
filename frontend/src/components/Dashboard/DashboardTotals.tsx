import React from 'react';
import type { DashboardTotals } from '../../types/dashboard';

type Props = { totals: DashboardTotals };

export function DashboardTotals({ totals }: Props) {
  return (
    <div>
      <div>Всего заказов: {totals.total_orders_count}</div>
      <div>
        Общая сумма заказанного: {Number(totals.total_amount_ordered).toFixed(2)} {totals.currency}
      </div>
    </div>
  );
}


