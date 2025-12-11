export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  email: string;
  token: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
}

