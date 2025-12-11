# E-Commerce React Native App
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



## Authentication

The app uses mock authentication with the following credentials:

- **Email**: `test@zignuts.com` OR `practical@zignuts.com`
- **Password**: `123456`

### How it works:

1. User enters credentials on the Login screen
2. On successful login, a fake token is generated and stored in AsyncStorage
3. App automatically logs in if a valid token exists
4. Login is required only when adding items to cart (if not logged in)

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

This project is for educational purposes.

## Author

Developed as part of Zignuts Practical Assessment
