import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductListScreen} from '../screens/ProductListScreen';
import {ProductDetailsScreen} from '../screens/ProductDetailsScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {CartScreen} from '../screens/CartScreen';
import {OrderHistoryScreen} from '../screens/OrderHistoryScreen';
import {Text} from 'react-native';
import {
  RootStackParamList,
  MainTabParamList,
  ProductStackParamList,
} from '../types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const ProductStack = createNativeStackNavigator<ProductStackParamList>();

const ProductStackNavigator = () => {
  return (
    <ProductStack.Navigator screenOptions={{headerShown: false}}>
      <ProductStack.Screen name="ProductList" component={ProductListScreen} />
      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
    </ProductStack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Products"
        component={ProductStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 24, color}}>🏪</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 24, color}}>🛒</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 24, color}}>📦</Text>
          ),
          title: 'Order History',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{presentation: 'modal'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

