import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  activeRoute?: string;
  onNavigate?: (route: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = activeRoute || location.pathname;

  const handleNavigate = (route: string) => {
    if (onNavigate) onNavigate(route);
    navigate(route);
  };

  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className={styles.logo} aria-label="Sonaka">
        <div className={styles.logoMark} />
        <span className={styles.logoText}>Sonaka</span>
      </div>
      <nav className={styles.nav} aria-label="Main Navigation">
        <button
          className={`${styles.navItem} ${current === '/dashboard' ? styles.active : ''}`}
          onClick={() => handleNavigate('/dashboard')}
          aria-current={current === '/dashboard' ? 'page' : undefined}
        >
          <span className={styles.bullet} />
          <span>Главная</span>
        </button>
        {/* Extend here for more routes when available */}
      </nav>
    </aside>
  );
};

export default Sidebar;


