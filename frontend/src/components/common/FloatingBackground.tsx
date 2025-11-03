import React from 'react';
import styles from './FloatingBackground.module.css';

export interface FloatingBackgroundProps {
  variant?: 'default' | 'minimal';
  disabled?: boolean;
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({
  variant = 'default',
  disabled = false,
}) => {
  if (disabled) {
    return null;
  }

  return (
    <div className={styles.floatingBackground}>
      <div className={`${styles.circle} ${styles.circle1}`} />
      <div className={`${styles.circle} ${styles.circle2}`} />
      <div className={`${styles.circle} ${styles.circle3}`} />
    </div>
  );
};

export default FloatingBackground;

