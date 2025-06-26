# Time Travelers' Emporium

A React TypeScript e-commerce application for a fictional shop selling artifacts from different historical eras and future timelines.

## 🚀 Features

- **Authentication System**: Login with hardcoded credentials (launchuser/password)
- **Product Catalog**: Browse 20 unique temporal artifacts with filtering and sorting
- **Shopping Cart**: Add items to cart with persistent storage
- **Toast Notification History**: Track and view all notifications with timestamps
- **Modern UI**: Clean, responsive design with toast notifications
- **Multiple Pages**: Home, Products, About Us, Contact Us, Cart, Checkout
- **Mock Functionality**: Contact form, forgot password, and checkout process

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **CSS Modules** for component styling

## 🎮 Demo Credentials

- **Username**: `launchuser`
- **Password**: `password`

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

4. **Login** using the demo credentials above

## 📱 Features Overview

### Authentication
- Secure login with hardcoded credentials
- Mock forgot password functionality
- Session persistence
- Automatic redirect to login when not authenticated

### Product Catalog
- 20 unique temporal artifacts
- Filter by era (Ancient, Medieval, Renaissance, Modern, Future)
- Sort by name, price (low to high/high to low), and era
- Search functionality
- Responsive grid layout

### Shopping Cart
- Add items to cart with one click
- Persistent cart storage using localStorage
- Real-time cart counter in navigation
- Complete checkout process with order confirmation
- Toast notifications for user feedback

### Notification System
- **Toast History**: Bell icon in navigation shows notification count
- **Notification Tracking**: All toasts are automatically tracked with timestamps
- **Categorized Notifications**: Success, error, loading, and custom message types
- **Clear History**: Option to clear all notification history
- **Responsive Design**: Works seamlessly on mobile and desktop

### Pages
- **Home**: Featured product of the day with company overview
- **Products**: Complete catalog with filtering and sorting
- **Pages**: Home, Products, About Us, Contact, Cart, Checkout, Order Confirmation

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx
│   ├── ToastHistory.tsx
│   └── *.module.css
├── contexts/           # React contexts
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── ToastHistoryContext.tsx
├── hooks/             # Custom hooks
│   └── useTrackedToast.ts
├── data/              # Static data
│   └── products.ts
├── pages/             # Page components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── OrderConfirmation.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   └── *.module.css
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🎨 Design System

- **Primary Colors**: Blue gradient (#3730a3 to #1e3a8a)
- **Success**: Green (#059669)
- **Warning**: Yellow (#fbbf24)
- **Error**: Red (#ef4444)
- **Typography**: System fonts with good readability
- **Spacing**: Consistent rem-based spacing scale
- **Shadows**: Subtle depth with box-shadows

## 🔮 Future Enhancements

- Real authentication system
- Backend integration
- Payment processing
- User profiles and order history
- Product reviews and ratings
- Wishlist functionality
- Advanced search with filters
- Admin panel for product management

## 📝 License

This is a demo project created for educational purposes. All product images are from Unsplash and used under their license.

---

*Step into our emporium and discover artifacts from across all timelines! 🕰️*
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
