import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {Product} from './index';

export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Products: undefined;
  Cart: undefined;
  Orders: undefined;
};

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetails: {
    product: Product;
  };
};

// Screen prop types
export type ProductDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProductStackParamList, 'ProductDetails'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type ProductListScreenProps = NativeStackScreenProps<
  ProductStackParamList,
  'ProductList'
>;

export type CartScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type OrderHistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Orders'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

