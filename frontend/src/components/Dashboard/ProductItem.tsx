import React from 'react';
import { Card } from '../Card/Card';
import styles from './ProductItem.module.css';
import type { PreviouslyPurchasedItem } from '../../types/dashboard';

type Props = { item: PreviouslyPurchasedItem };

export function ProductItem({ item }: Props) {
  return (
    <Card className={styles.item} hoverable>
      <div className={styles.imageBox} aria-hidden>
        {item.product_image_url ? (
          <img className={styles.image} src={item.product_image_url} alt={item.product_name} />
        ) : (
          <span>🛒</span>
        )}
      </div>
      <div>
        <p className={styles.name}>{item.product_name}</p>
        <p className={styles.meta}>
          Кол-во: {item.total_quantity}
          {item.last_purchased_date ? ` • Последняя покупка: ${item.last_purchased_date}` : ''}
        </p>
      </div>
    </Card>
  );
}

export default ProductItem;


