import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../components/Header';
import {Button} from '../components/Button';
import {useApp} from '../context/AppContext';
import {CartScreenProps} from '../types/navigation';

export const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  const {cart, removeFromCart, updateCartItemQuantity, getCartTotal, placeOrder, user} = useApp();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please login to place an order');
      return;
    }

    Alert.alert(
      'Confirm Order',
      `Total: $${getCartTotal().toFixed(2)}\n\nDo you want to place this order?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Place Order',
          onPress: async () => {
            await placeOrder();
            Alert.alert('Success', 'Order placed successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Orders'),
              },
            ]);
          },
        },
      ],
    );
  };

  const renderCartItem = ({item}: {item: any}) => {
    const {product, quantity} = item;
    const itemTotal = product.price * quantity;

    return (
      <View style={styles.cartItem}>
        <Image source={{uri: product.image}} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateCartItemQuantity(product.id, quantity - 1)}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateCartItemQuantity(product.id, quantity + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.itemTotal}>${itemTotal.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(product.id)}>
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Cart" />
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Button
            title="Browse Products"
            onPress={() => navigation.navigate('Products')}
            style={styles.browseButton}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={item => item.product.id.toString()}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>${getCartTotal().toFixed(2)}</Text>
            </View>
            <Button
              title="Place Order"
              onPress={handlePlaceOrder}
              style={styles.orderButton}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    minWidth: 30,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginLeft: 'auto',
  },
  removeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 32,
    color: '#FF3B30',
    lineHeight: 32,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  orderButton: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 24,
  },
  browseButton: {
    width: '100%',
    maxWidth: 300,
  },
});

