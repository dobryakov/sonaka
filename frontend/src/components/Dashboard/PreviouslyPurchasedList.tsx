import React from 'react';
import type { PreviouslyPurchasedItem } from '../../types/dashboard';
import { ProductItem } from './ProductItem';
import { EmptyState } from '../common/EmptyState';
import styles from './ProductItem.module.css';

type Props = { items: PreviouslyPurchasedItem[] };

export function PreviouslyPurchasedList({ items }: Props) {
  if (!items.length) return <EmptyState title="Ранее купленные товары" description="Пока пусто" />;
  return (
    <div className={styles.grid}>
      {items.map((it) => (
        <ProductItem key={it.product_id} item={it} />
      ))}
    </div>
  );
}


