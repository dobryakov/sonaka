import React from 'react';
import styles from './GradientTitle.module.css';

export interface GradientTitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const GradientTitle: React.FC<GradientTitleProps> = ({
  children,
  level = 1,
  variant = 'primary',
  className = '',
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const titleClasses = [
    styles.gradientTitle,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <HeadingTag className={titleClasses}>
      {children}
    </HeadingTag>
  );
};

export default GradientTitle;

