import React from 'react';
import { Card } from '../Card/Card';
import styles from './StatCard.module.css';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.icon} aria-hidden>{icon ?? '★'}</div>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
        {description ? <p className={styles.desc}>{description}</p> : null}
      </div>
    </Card>
  );
};

export default StatCard;


