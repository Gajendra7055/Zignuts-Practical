import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {User, Product, CartItem, Order} from '../types';
import {storageService} from '../services/storage';
import {validateCredentials, generateToken} from '../utils/auth';

interface AppContextType {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
  loadOrders: () => Promise<void>;
  getCartTotal: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      const token = await storageService.getUserToken();
      const userData = await storageService.getUserData();
      
      if (token && userData) {
        setUser(userData);
      }
      
      await loadOrders();
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (validateCredentials(email, password)) {
      const token = generateToken();
      const userData: User = {email, token};
      
      await storageService.saveUserToken(token);
      await storageService.saveUserData(userData);
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await storageService.removeUserToken();
    await storageService.removeUserData();
    setUser(null);
    setCart([]);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...prevCart, {product, quantity: 1}];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? {...item, quantity} : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const placeOrder = async (): Promise<void> => {
    if (cart.length === 0) return;

    const order: Order = {
      id: generateToken(),
      date: new Date().toISOString(),
      items: [...cart],
      totalPrice: getCartTotal(),
    };

    await storageService.addOrder(order);
    await loadOrders();
    clearCart();
  };

  const loadOrders = async (): Promise<void> => {
    const loadedOrders = await storageService.getOrders();
    setOrders(loadedOrders);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        orders,
        isLoading,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        placeOrder,
        loadOrders,
        getCartTotal,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

