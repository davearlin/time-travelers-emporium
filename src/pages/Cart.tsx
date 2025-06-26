import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTrackedToast } from '../hooks/useTrackedToast';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const toast = useTrackedToast();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <ShoppingCart size={64} className={styles.emptyIcon} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any temporal artifacts to your cart yet.</p>
          <Link to="/products" className={styles.shopButton}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/products" className={styles.backButton}>
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
        <div className={styles.cartTitle}>
          <ShoppingCart size={24} />
          <h1>Shopping Cart ({getTotalItems()} items)</h1>
        </div>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.product.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop';
                  }}
                />
              </div>
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.product.name}</h3>
                <p className={styles.itemCategory}>{item.product.category}</p>
                <p className={styles.itemEra}>
                  {item.product.era.charAt(0).toUpperCase() + item.product.era.slice(1)} Era
                </p>
                <p className={styles.itemDescription}>
                  {item.product.description.length > 100 
                    ? `${item.product.description.substring(0, 100)}...` 
                    : item.product.description
                  }
                </p>
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className={styles.quantityButton}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className={styles.quantityButton}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className={styles.itemPrice}>
                  <span className={styles.unitPrice}>
                    ${item.product.price.toLocaleString()} each
                  </span>
                  <span className={styles.totalPrice}>
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                <button 
                  onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                  className={styles.removeButton}
                  title="Remove from cart"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.summaryCard}>
            <h3>Order Summary</h3>
            
            <div className={styles.summaryLine}>
              <span>Items ({getTotalItems()})</span>
              <span>${getTotalPrice().toLocaleString()}</span>
            </div>
            
            <div className={styles.summaryLine}>
              <span>Temporal Shipping</span>
              <span>FREE</span>
            </div>
            
            <div className={styles.summaryLine}>
              <span>Timeline Insurance</span>
              <span>$99.99</span>
            </div>
            
            <div className={styles.summaryLine}>
              <span>Paradox Protection</span>
              <span>$49.99</span>
            </div>
            
            <hr className={styles.divider} />
            
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${(getTotalPrice() + 149.98).toLocaleString()}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className={styles.checkoutButton}
            >
              Proceed to Checkout
            </button>

            <button 
              onClick={handleClearCart}
              className={styles.clearCartButton}
            >
              Clear Cart
            </button>

            <div className={styles.guarantees}>
              <h4>Our Guarantees</h4>
              <ul>
                <li>✅ Temporal authenticity verified</li>
                <li>✅ 30-day return policy</li>
                <li>✅ Paradox-free delivery</li>
                <li>✅ Timeline damage protection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
