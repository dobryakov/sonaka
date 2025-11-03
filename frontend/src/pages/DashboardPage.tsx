import React, { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardService';
import type { DashboardResponse } from '../types/dashboard';
import { OrdersList } from '../components/Dashboard/OrdersList';
import { PreviouslyPurchasedList } from '../components/Dashboard/PreviouslyPurchasedList';
import { GradientTitle } from '../components/GradientTitle/GradientTitle';
import { FloatingBackground } from '../components/common/FloatingBackground';
import { Card } from '../components/Card/Card';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { StatsGrid } from '../components/Dashboard/StatsGrid';

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
    <div style={{ position: 'relative' }}>
      <FloatingBackground />
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1rem' }}>
        <Sidebar />
        <div style={{ display: 'grid', gap: '1rem' }}>
          <GradientTitle level={1}>Дашборд</GradientTitle>
          <StatsGrid totals={data.totals} />
          <Card>
            <GradientTitle level={2}>Мои заказы</GradientTitle>
            <div style={{ marginTop: '1rem' }}>
              <OrdersList orders={data.orders} />
            </div>
          </Card>
          <Card>
            <GradientTitle level={2}>Ранее купленные товары</GradientTitle>
            <div style={{ marginTop: '1rem' }}>
              <PreviouslyPurchasedList items={data.previously_purchased_items ?? []} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


