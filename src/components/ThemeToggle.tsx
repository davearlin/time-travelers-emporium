import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={styles.iconContainer}>
        <Sun 
          size={18} 
          className={`${styles.icon} ${styles.sunIcon} ${theme === 'light' ? styles.active : ''}`}
        />
        <Moon 
          size={18} 
          className={`${styles.icon} ${styles.moonIcon} ${theme === 'dark' ? styles.active : ''}`}
        />
      </div>
      <span className={styles.label}>
        {theme === 'light' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};
