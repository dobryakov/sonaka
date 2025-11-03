import React from 'react';
import type { PreviouslyPurchasedItem } from '../../types/dashboard';

type Props = { items: PreviouslyPurchasedItem[] };

export function PreviouslyPurchasedList({ items }: Props) {
  if (!items.length) return <div>Ранее купленные товары отсутствуют</div>;
  return (
    <ul>
      {items.map((it) => (
        <li key={it.product_id}>
          {it.product_image_url ? (
            <img src={it.product_image_url} alt={it.product_name} width={40} height={40} />
          ) : null}
          <strong>{it.product_name}</strong> — Кол-во: {it.total_quantity}
          {it.last_purchased_date ? ` — Последняя покупка: ${it.last_purchased_date}` : ''}
        </li>
      ))}
    </ul>
  );
}


