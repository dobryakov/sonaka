import React, { useEffect, useState } from 'react';
import { getOrderDetails } from '../services/ordersService';
import type { OrderDetails } from '../types/order';
// If react-router is configured, use useParams; otherwise accept a prop later

type Props = { orderId?: number | string };

export default function OrderDetailsPage({ orderId }: Props) {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const id = orderId ?? 1; // fallback for manual testing

  useEffect(() => {
    (async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div>Загрузка…</div>;
  if (!order) return <div>Не удалось загрузить детали заказа</div>;

  // Lazy import to avoid circular
  const { OrderDetailsView } = require('../components/OrderDetails/OrderDetailsView');
  return <OrderDetailsView order={order} />;
}


