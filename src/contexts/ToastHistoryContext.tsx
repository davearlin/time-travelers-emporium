import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'loading' | 'custom';
  timestamp: Date;
}

interface ToastHistoryContextType {
  notifications: ToastNotification[];
  addNotification: (message: string, type: ToastNotification['type']) => void;
  clearHistory: () => void;
}

const ToastHistoryContext = createContext<ToastHistoryContextType | undefined>(undefined);

export const useToastHistory = () => {
  const context = useContext(ToastHistoryContext);
  if (!context) {
    throw new Error('useToastHistory must be used within a ToastHistoryProvider');
  }
  return context;
};

interface ToastHistoryProviderProps {
  children: ReactNode;
}

export const ToastHistoryProvider: React.FC<ToastHistoryProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const addNotification = (message: string, type: ToastNotification['type']) => {
    const newNotification: ToastNotification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearHistory = () => {
    setNotifications([]);
  };

  return (
    <ToastHistoryContext.Provider value={{ notifications, addNotification, clearHistory }}>
      {children}
    </ToastHistoryContext.Provider>
  );
};
