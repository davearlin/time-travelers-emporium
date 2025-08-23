import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Clock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrackedToast } from '../hooks/useTrackedToast';
import { ThemeToggle } from '../components/ThemeToggle';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const { user, login } = useAuth();
  const toast = useTrackedToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (user?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    setIsLoading(false);

    if (success) {
      toast.success('Welcome to Time Travelers\' Emporium!');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password reset link sent to your temporal email!');
    setShowForgotPassword(false);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.themeToggleContainer}>
        <ThemeToggle />
      </div>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <Clock className={styles.logo} size={48} />
          <h1>Time Travelers' Emporium</h1>
          <p>Authentication Portal</p>
        </div>

        {!showForgotPassword ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordInput}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Enter Emporium'}
            </button>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className={styles.forgotPassword}
              >
                Forgot your temporal credentials?
              </button>
            </div>

            <div className={styles.demoCredentials}>
              <h3>Demo Credentials</h3>
              <p><strong>Username:</strong> launchuser</p>
              <p><strong>Password:</strong> password</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className={styles.form}>
            <h2>Reset Password</h2>
            <p>Enter your username to receive a temporal password reset link.</p>
            
            <div className={styles.inputGroup}>
              <label htmlFor="resetUsername">Username</label>
              <input
                id="resetUsername"
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Send Reset Link
            </button>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className={styles.forgotPassword}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
