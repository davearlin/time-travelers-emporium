import React from 'react';
import { ShoppingCart, Clock, Star, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTrackedToast } from '../hooks/useTrackedToast';
import { getFeaturedProduct } from '../data/products';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const toast = useTrackedToast();
  const featuredProduct = getFeaturedProduct();

  const handleAddToCart = () => {
    addToCart(featuredProduct);
    toast.success(`${featuredProduct.name} added to cart!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <Clock className={styles.heroIcon} />
            Welcome to Time Travelers' Emporium
          </h1>
          <p className={styles.heroSubtitle}>
            Discover authentic artifacts from across all timelines - from ancient civilizations 
            to distant futures. Each item comes with a certificate of temporal authenticity.
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.feature}>
              <Star className={styles.featureIcon} />
              <span>Certified Authentic</span>
            </div>
            <div className={styles.feature}>
              <Sparkles className={styles.featureIcon} />
              <span>Timeline Verified</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Artifact of the Day</h2>
        <div className={styles.featuredProduct}>
          <div className={styles.productImage}>
            <img 
              src={featuredProduct.image} 
              alt={featuredProduct.name}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
              }}
            />
            <div className={styles.featuredBadge}>
              <Star size={16} />
              Featured
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <h3 className={styles.productName}>{featuredProduct.name}</h3>
              <span className={styles.productEra}>
                {featuredProduct.era.charAt(0).toUpperCase() + featuredProduct.era.slice(1)} Era
              </span>
            </div>
            <p className={styles.productDescription}>
              {featuredProduct.description}
            </p>
            <div className={styles.productDetails}>
              <span className={styles.productCategory}>
                Category: {featuredProduct.category}
              </span>
              <span className={styles.productPrice}>
                ${featuredProduct.price.toLocaleString()}
              </span>
            </div>
            <button 
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Temporal Guarantee</h3>
            <p>
              Every artifact comes with our exclusive Temporal Guarantee. 
              If you're not satisfied, return it within 30 days to any timeline.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Expert Authentication</h3>
            <p>
              Our team of certified chronoarchaeologists verifies each item's 
              authenticity using advanced temporal analysis techniques.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Secure Shipping</h3>
            <p>
              Items are carefully packaged and shipped through our quantum-stabilized 
              delivery network for safe arrival in your timeline.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
