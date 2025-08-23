// Asset Constants for Images and SVGs
// All assets should be referenced using localhost URLs as shown below

// Example image assets - replace with your actual asset names
export const ASSETS = {
  // Hero and banner images
  HERO_BANNER: 'http://localhost:3845/assets/hero-banner.png',
  HERO_BACKGROUND: 'http://localhost:3845/assets/hero-bg.jpg',
  
  // Logo and branding
  LOGO_SVG: 'http://localhost:3845/assets/logo.svg',
  LOGO_PNG: 'http://localhost:3845/assets/logo.png',
  FAVICON: 'http://localhost:3845/assets/favicon.ico',
  
  // Product images
  PRODUCT_PLACEHOLDER: 'http://localhost:3845/assets/product-placeholder.png',
  PRODUCT_IMAGE_1: 'http://localhost:3845/assets/product-1.jpg',
  PRODUCT_IMAGE_2: 'http://localhost:3845/assets/product-2.jpg',
  PRODUCT_IMAGE_3: 'http://localhost:3845/assets/product-3.jpg',
  
  // Icons and graphics
  ICON_CART: 'http://localhost:3845/assets/cart-icon.svg',
  ICON_USER: 'http://localhost:3845/assets/user-icon.svg',
  ICON_SEARCH: 'http://localhost:3845/assets/search-icon.svg',
  ICON_ARROW: 'http://localhost:3845/assets/arrow-icon.svg',
  
  // Background patterns and textures
  PATTERN_DOTS: 'http://localhost:3845/assets/pattern-dots.svg',
  PATTERN_WAVES: 'http://localhost:3845/assets/pattern-waves.svg',
  TEXTURE_PAPER: 'http://localhost:3845/assets/texture-paper.jpg',
  
  // Category images
  CATEGORY_ARTIFACTS: 'http://localhost:3845/assets/category-artifacts.jpg',
  CATEGORY_TIMEPIECES: 'http://localhost:3845/assets/category-timepieces.jpg',
  CATEGORY_SCROLLS: 'http://localhost:3845/assets/category-scrolls.jpg',
  
  // Decorative elements
  ORNAMENT_CORNER: 'http://localhost:3845/assets/ornament-corner.svg',
  DIVIDER_VINTAGE: 'http://localhost:3845/assets/divider-vintage.svg',
  FRAME_ANTIQUE: 'http://localhost:3845/assets/frame-antique.png',
  
  // Error and placeholder states
  IMAGE_NOT_FOUND: 'http://localhost:3845/assets/image-not-found.svg',
  LOADING_SPINNER: 'http://localhost:3845/assets/loading-spinner.svg',
  EMPTY_STATE: 'http://localhost:3845/assets/empty-state.svg',
} as const;

// Type for asset keys
export type AssetKey = keyof typeof ASSETS;

// Helper function to get asset URL
export const getAssetUrl = (key: AssetKey): string => {
  return ASSETS[key];
};

// Alternative helper for dynamic asset loading
export const getDynamicAsset = (filename: string): string => {
  return `http://localhost:3845/assets/${filename}`;
};

// Usage examples:
/*
import { ASSETS, getAssetUrl, getDynamicAsset } from './assets';

// Direct usage
const heroImage = ASSETS.HERO_BANNER;

// Using helper function
const logoUrl = getAssetUrl('LOGO_SVG');

// Dynamic asset loading
const customImage = getDynamicAsset('custom-image.png');

// In React components:
<img src={ASSETS.LOGO_PNG} alt="Logo" />
<img src={getAssetUrl('PRODUCT_IMAGE_1')} alt="Product" />
<img src={getDynamicAsset('user-avatar.jpg')} alt="User Avatar" />
*/
