import React, { useState, useMemo } from 'react';
import { ShoppingCart, Filter, SortAsc } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTrackedToast } from '../hooks/useTrackedToast';
import { products } from '../data/products';
import type { Product, SortOption, FilterOption } from '../types';
import styles from './Products.module.css';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const toast = useTrackedToast();
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by era
    if (filterBy !== 'all') {
      filtered = filtered.filter(product => product.era === filterBy);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'era':
          return a.era.localeCompare(b.era);
        default:
          return 0;
      }
    });

    return sorted;
  }, [sortBy, filterBy, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Products Catalog</h1>
        <p>Explore our collection of temporal artifacts from across all timelines</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={16} />
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className={styles.select}
            >
              <option value="all">All Eras</option>
              <option value="ancient">Ancient</option>
              <option value="medieval">Medieval</option>
              <option value="renaissance">Renaissance</option>
              <option value="modern">Modern</option>
              <option value="future">Future</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <SortAsc size={16} />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={styles.select}
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="era">Era</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.resultsInfo}>
        <p>Showing {filteredAndSortedProducts.length} of {products.length} products</p>
      </div>

      <div className={styles.productsGrid}>
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <img 
                src={product.image} 
                alt={product.name}
                className={styles.productImage}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                }}
              />
              <div className={styles.productEra}>
                {product.era.charAt(0).toUpperCase() + product.era.slice(1)}
              </div>
              {product.featured && (
                <div className={styles.featuredBadge}>Featured</div>
              )}
            </div>
            
            <div className={styles.productContent}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productCategory}>{product.category}</p>
              <p className={styles.productDescription}>
                {product.description.length > 100 
                  ? `${product.description.substring(0, 100)}...` 
                  : product.description
                }
              </p>
              
              <div className={styles.productFooter}>
                <span className={styles.productPrice}>
                  ${product.price.toLocaleString()}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={styles.addToCartButton}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className={styles.noResults}>
          <p>No products found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilterBy('all');
              setSortBy('name');
            }}
            className={styles.clearFiltersButton}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
