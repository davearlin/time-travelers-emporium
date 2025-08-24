import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastHistoryProvider } from './contexts/ToastHistoryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, initializing } = useAuth();
  if (initializing) {
    // Minimal placeholder to avoid redirect flicker during auth rehydration
    return null;
  }
  return user?.isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ToastHistoryProvider>
            <Router>
              <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/products" element={
                <ProtectedRoute>
                  <Layout>
                    <Products />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Layout>
                    <Cart />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Layout>
                    <Checkout />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation" element={
                <ProtectedRoute>
                  <Layout>
                    <OrderConfirmation />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <Layout>
                    <About />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Layout>
                    <Contact />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-family-supporting)',
                  padding: '1rem 1.25rem',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: 'var(--color-success-light)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-success)',
                  },
                  iconTheme: {
                    primary: 'var(--color-success)',
                    secondary: 'var(--color-surface)',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: 'var(--color-error-light)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-error)',
                  },
                  iconTheme: {
                    primary: 'var(--color-error)',
                    secondary: 'var(--color-surface)',
                  },
                },
              }}
            />
          </div>
        </Router>
      </ToastHistoryProvider>
    </CartProvider>
  </AuthProvider>
  </ThemeProvider>
  );
}

export default App;
