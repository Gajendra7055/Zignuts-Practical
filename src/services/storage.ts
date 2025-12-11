import AsyncStorage from '@react-native-async-storage/async-storage';
import {User, Order} from '../types';

const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  ORDERS: 'orders',
};

export const storageService = {
  // User token
  async saveUserToken(token: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
  },

  async getUserToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  },

  async removeUserToken(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
  },

  // User data
  async saveUserData(user: User): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  async getUserData(): Promise<User | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  async removeUserData(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  // Orders
  async saveOrders(orders: Order[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  async getOrders(): Promise<Order[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  async addOrder(order: Order): Promise<void> {
    const orders = await this.getOrders();
    orders.unshift(order); // Add to beginning (latest first)
    await this.saveOrders(orders);
  },
};

