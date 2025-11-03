import React, { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardService';
import type { DashboardResponse } from '../types/dashboard';
import { DashboardTotals } from '../components/Dashboard/DashboardTotals';
import { OrdersList } from '../components/Dashboard/OrdersList';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDashboard();
        setData(res);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Загрузка…</div>;
  if (!data) return <div>Не удалось загрузить дашборд</div>;

  return (
    <div>
      <DashboardTotals totals={data.totals} />
      <OrdersList orders={data.orders} />
    </div>
  );
}


