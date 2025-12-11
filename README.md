# E-Commerce React Native App

A full-featured e-commerce mobile application built with React Native, featuring product browsing, shopping cart, authentication, and order management.

## Features

- 🔐 **Authentication System**
  - Mock login with predefined credentials
  - Auto-login with token persistence
  - Secure token storage using AsyncStorage

- 🛍️ **Product Management**
  - Browse products from FakeStore API
  - Product details with images, descriptions, and ratings
  - Real-time product data fetching

- 🛒 **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Real-time total calculation
  - Cart persistence

- 📦 **Order Management**
  - Place orders with cart items
  - Order history tracking
  - Order details (ID, date, total, items count)

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface
  - Reusable components
  - Smooth navigation
  - Loading states and error handling

## Tech Stack

- **React Native** 0.83.0
- **TypeScript**
- **React Navigation** (Stack + Bottom Tabs)
- **Context API** (State Management)
- **AsyncStorage** (Data Persistence)
- **FakeStore API** (Product Data)

## Installation

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS Simulator (for Mac) or Android Emulator
- Xcode (for iOS) or Android Studio (for Android)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gajendra7055/Zignuts-Practical.git
   cd Zignuts-Practical
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**

   For iOS:
   ```bash
   npm run ios
   ```

   For Android:
   ```bash
   npm run android
   ```

## Project Structure

```
Zignuts-Practical/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   ├── ProductCard.tsx
│   │   └── Toast.tsx
│   ├── screens/             # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── ProductListScreen.tsx
│   │   ├── ProductDetailsScreen.tsx
│   │   ├── CartScreen.tsx
│   │   └── OrderHistoryScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── context/             # Context API for state management
│   │   └── AppContext.tsx
│   ├── services/            # API and storage services
│   │   ├── api.ts
│   │   └── storage.ts
│   ├── utils/               # Utility functions
│   │   └── auth.ts
│   └── types/               # TypeScript type definitions
│       ├── index.ts
│       └── navigation.ts
├── App.tsx                  # Main app component
├── package.json
└── README.md
```

## Authentication

The app uses mock authentication with the following credentials:

- **Email**: `test@zignuts.com` OR `practical@zignuts.com`
- **Password**: `123456`

### How it works:

1. User enters credentials on the Login screen
2. On successful login, a fake token is generated and stored in AsyncStorage
3. App automatically logs in if a valid token exists
4. Login is required only when adding items to cart (if not logged in)

## Usage

### Product List Screen

- Displays all available products from the API
- Shows product image, title, and price
- Tap any product to view details
- Pull to refresh to reload products

### Product Details Screen

- Shows full product information
- Large product image
- Description, price, category, and ratings
- "Add to Cart" button
  - If not logged in: Shows login modal
  - If logged in: Adds product to cart with success message

### Cart Screen

- View all items in cart
- Update quantities (+/- buttons)
- Remove items
- View total price
- "Place Order" button to checkout

### Order History Screen

- View all past orders
- Shows order ID, date, total price, and item count
- Latest orders appear first

## State Management

The app uses React Context API for state management with the following state:

- **User**: Logged-in user information and token
- **Cart**: Array of cart items with quantities
- **Orders**: Array of placed orders

## Data Persistence

AsyncStorage is used to persist:

- **User Token**: For auto-login functionality
- **User Data**: Email and token information
- **Orders**: All placed orders

## API Integration

The app fetches product data from:
- **Base URL**: `https://fakestoreapi.com`
- **Endpoints**:
  - `GET /products` - Get all products
  - `GET /products/:id` - Get product by ID

## Reusable Components

### Button
Customizable button component with variants (primary, secondary, outline) and loading state.

### Header
Navigation header with back button support and custom right component.

### Loader
Full-screen loading indicator.

### Modal
Custom modal component with title, message, and action buttons.

### ProductCard
Product card component displaying image, title, and price.

### Toast
Toast notification component for success/error messages.

## Screenshots

<!-- Add screenshots here -->
- Product List Screen
- Product Details Screen
- Cart Screen
- Order History Screen
- Login Screen

## Development

### Running the development server

```bash
npm start
```

### Running tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   - Clean build: `cd android && ./gradlew clean && cd ..`
   - Rebuild: `npm run android`

## Future Enhancements

- [ ] User profile management
- [ ] Product search and filtering
- [ ] Product categories
- [ ] Payment integration
- [ ] Push notifications
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality

## License

This project is for educational purposes.

## Author

Developed as part of Zignuts Practical Assessment
