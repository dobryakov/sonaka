import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderDetailsView } from '../../src/components/OrderDetails/OrderDetailsView';
import type { OrderDetails } from '../../src/types/order';

describe('OrderDetailsView', () => {
  const order: OrderDetails = {
    id: 1,
    order_number: 'ORD-123',
    order_date: '2025-11-03T00:00:00.000Z',
    status: 'completed',
    total_amount: 250.0,
    currency: 'RUB',
    item_count: 2,
    order_items: [
      { id: 11, product_id: 101, product_name: 'Товар A', product_image_url: null, quantity: 1, unit_price: 100.0, total_price: 100.0 },
      { id: 12, product_id: 102, product_name: 'Товар B', product_image_url: null, quantity: 3, unit_price: 50.0, total_price: 150.0 },
    ],
  };

  it('renders order number, totals and items', () => {
    render(<OrderDetailsView order={order} />);
    expect(screen.getByText(/Заказ ORD-123/i)).toBeInTheDocument();
    expect(screen.getByText(/Итого: 250.00 RUB/i)).toBeInTheDocument();
    expect(screen.getByText('Товар A')).toBeInTheDocument();
    expect(screen.getByText('Товар B')).toBeInTheDocument();
  });
});


