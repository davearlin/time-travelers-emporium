import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import ToastHistory from './ToastHistory';
import { ThemeToggle } from './ThemeToggle';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();

  if (!user?.isAuthenticated) {
    return <>{children}</>;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <Clock className={styles.logoIcon} />
            <span>Time Travelers' Emporium</span>
          </Link>
          
          <nav className={styles.nav}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`${styles.navLink} ${isActive('/products') ? styles.active : ''}`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
            >
              Contact
            </Link>
          </nav>

          <div className={styles.userActions}>
            <ThemeToggle />
            
            <ToastHistory />
            
            <Link to="/cart" className={styles.cartButton}>
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className={styles.cartBadge}>{getTotalItems()}</span>
              )}
            </Link>
            
            <div className={styles.userInfo}>
              <User size={16} />
              <span>{user.username}</span>
            </div>
            
            <button onClick={logout} className={styles.logoutButton}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2025 Time Travelers' Emporium. All artifacts authenticated across all timelines.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
