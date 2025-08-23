import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, Mail, Home } from 'lucide-react';
import styles from './OrderConfirmation.module.css';

interface OrderState {
  orderNumber: string;
  totalAmount: number;
  itemCount: number;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as OrderState;

  useEffect(() => {
    // If no order data, redirect to home
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className={styles.container}>
      <div className={styles.confirmationCard}>
        <div className={styles.successIcon}>
          <CheckCircle size={64} />
        </div>
        
        <h1>Order Confirmed!</h1>
        <p className={styles.subtitle}>
          Thank you for your purchase from Time Travelers' Emporium
        </p>

        <div className={styles.orderDetails}>
          <div className={styles.orderNumber}>
            <h2>Order #{orderData.orderNumber}</h2>
            <span className={styles.status}>Processing</span>
          </div>
          
          <div className={styles.orderSummary}>
            <div className={styles.summaryItem}>
              <span>Items Ordered:</span>
              <span>{orderData.itemCount} artifacts</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Total Amount:</span>
              <span>${orderData.totalAmount.toLocaleString()}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Estimated Delivery:</span>
              <span>{estimatedDelivery.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className={styles.nextSteps}>
          <h3>What happens next?</h3>
          <div className={styles.stepsList}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <Mail size={20} />
              </div>
              <div className={styles.stepContent}>
                <h4>Confirmation Email</h4>
                <p>You'll receive an order confirmation email with all the details within the next few temporal minutes.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <Package size={20} />
              </div>
              <div className={styles.stepContent}>
                <h4>Temporal Authentication</h4>
                <p>Our chronoarchaeologists will verify and prepare your artifacts for secure temporal transit.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <Clock size={20} />
              </div>
              <div className={styles.stepContent}>
                <h4>Timeline Delivery</h4>
                <p>Your artifacts will be carefully transported through our quantum delivery network to your timeline.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.importantInfo}>
          <h3>Important Timeline Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h4>🔒 Paradox Protection</h4>
              <p>Your order is protected against timeline disruptions and temporal paradoxes.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>📦 Secure Packaging</h4>
              <p>Artifacts are packaged in quantum-stabilized containers to prevent temporal degradation.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>🕰️ Timeline Guarantee</h4>
              <p>If your artifacts don't arrive in the correct timeline, we'll track them down at no extra cost.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>🔄 30-Day Returns</h4>
              <p>Not satisfied? Return your artifacts within 30 days to any timeline we operate in.</p>
            </div>
          </div>
        </div>

        <div className={styles.contactInfo}>
          <h3>Need Help?</h3>
          <p>If you have any questions about your order or need to make changes, please contact our temporal customer service team:</p>
          <div className={styles.contactMethods}>
            <div className={styles.contactMethod}>
              <strong>Temporal Email:</strong> orders@timetravelers-emporium.temporal
            </div>
            <div className={styles.contactMethod}>
              <strong>Quantum Phone:</strong> +1 (555) TIME-001
            </div>
            <div className={styles.contactMethod}>
              <strong>Emergency Paradox Line:</strong> +1 (555) PARADOX
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            <Home size={20} />
            Return to Home
          </Link>
          <Link to="/products" className={styles.shopButton}>
            Continue Shopping
          </Link>
        </div>

        <div className={styles.orderTracking}>
          <p>
            <strong>Order Tracking:</strong> You can track your order status and timeline delivery progress 
            by visiting our Quantum Tracking Portal (feature coming soon to this timeline).
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
