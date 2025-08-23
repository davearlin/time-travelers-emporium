import React, { useState } from 'react';
import { Bell, X, Trash2 } from 'lucide-react';
import { useToastHistory } from '../contexts/ToastHistoryContext';
import styles from './ToastHistory.module.css';

const ToastHistory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, clearHistory } = useToastHistory();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'loading':
        return '⏳';
      default:
        return 'ℹ️';
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'loading':
        return styles.loading;
      default:
        return styles.custom;
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
        title="Notification History"
      >
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className={styles.badge}>{notifications.length}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.dropdown}>
            <div className={styles.header}>
              <h3>Notification History</h3>
              <div className={styles.headerActions}>
                {notifications.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className={styles.clearButton}
                    title="Clear all notifications"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className={styles.closeButton}
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className={styles.content}>
              {notifications.length === 0 ? (
                <div className={styles.empty}>
                  <Bell size={32} />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className={styles.list}>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`${styles.item} ${getTypeClass(notification.type)}`}
                    >
                      <div className={styles.itemIcon}>
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className={styles.itemContent}>
                        <div className={styles.itemMessage}>
                          {notification.message}
                        </div>
                        <div className={styles.itemTime}>
                          {formatTime(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ToastHistory;
