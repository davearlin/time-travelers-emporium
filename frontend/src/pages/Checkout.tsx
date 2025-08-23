import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import styles from './Checkout.module.css';

interface CheckoutForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  
  // Timeline Information
  currentTimeline: string;
  deliveryTimeline: string;
}

const Checkout: React.FC = () => {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    currentTimeline: '2025',
    deliveryTimeline: '2025'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Clear cart and navigate to success page
    clearCart();
    setIsSubmitting(false);
    
    navigate('/order-confirmation', { 
      state: { 
        orderNumber: `TTE-${Date.now()}`,
        totalAmount: getTotalPrice() + 149.98,
        itemCount: getTotalItems()
      }
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping
  const insurance = 99.99;
  const paradoxProtection = 49.99;
  const total = subtotal + shipping + insurance + paradoxProtection;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate('/cart')} className={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Cart
        </button>
        <h1>Checkout</h1>
      </div>

      <div className={styles.checkoutContent}>
        <div className={styles.checkoutForm}>
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <section className={styles.formSection}>
              <h2>Personal Information</h2>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className={styles.formSection}>
              <h2>
                <Truck size={20} />
                Shipping Address
              </h2>
              <div className={styles.formGrid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="state">State/Province *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="zipCode">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="country">Country *</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Timeline Information */}
            <section className={styles.formSection}>
              <h2>
                <Shield size={20} />
                Timeline Information
              </h2>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="currentTimeline">Current Timeline</label>
                  <select
                    id="currentTimeline"
                    name="currentTimeline"
                    value={formData.currentTimeline}
                    onChange={handleInputChange}
                  >
                    <option value="2025">2025 CE (Standard Timeline)</option>
                    <option value="1885">1885 CE (Victorian Era)</option>
                    <option value="2387">2387 CE (Future Timeline)</option>
                    <option value="alternate">Alternate Timeline</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="deliveryTimeline">Delivery Timeline</label>
                  <select
                    id="deliveryTimeline"
                    name="deliveryTimeline"
                    value={formData.deliveryTimeline}
                    onChange={handleInputChange}
                  >
                    <option value="2025">2025 CE (Standard Timeline)</option>
                    <option value="1885">1885 CE (Victorian Era)</option>
                    <option value="2387">2387 CE (Future Timeline)</option>
                    <option value="same">Same as Current Timeline</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Payment Information */}
            <section className={styles.formSection}>
              <h2>
                <CreditCard size={20} />
                Payment Information
              </h2>
              <div className={styles.formGrid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="nameOnCard">Name on Card *</label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing Order...' : `Complete Order - $${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <div className={styles.summaryCard}>
            <h3>Order Summary</h3>
            
            <div className={styles.orderItems}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.summaryItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.product.name}</span>
                    <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.summaryLine}>
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Temporal Shipping</span>
                <span>FREE</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Timeline Insurance</span>
                <span>${insurance.toLocaleString()}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Paradox Protection</span>
                <span>${paradoxProtection.toLocaleString()}</span>
              </div>
              <hr className={styles.divider} />
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <div className={styles.securityInfo}>
              <h4>🔒 Secure Checkout</h4>
              <p>Your payment information is encrypted using quantum-level security protocols.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
