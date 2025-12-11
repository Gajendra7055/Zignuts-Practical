import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../components/Header';
import {useApp} from '../context/AppContext';
import {Order} from '../types';
import {OrderHistoryScreenProps} from '../types/navigation';

export const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({
  navigation,
}) => {
  const {orders, loadOrders} = useApp();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrders();
    });
    return unsubscribe;
  }, [navigation, loadOrders]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getItemsCount = (order: Order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  const renderOrderItem = ({item}: {item: Order}) => {
    return (
      <TouchableOpacity style={styles.orderItem} activeOpacity={0.7}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Order #{item.id.slice(0, 8)}</Text>
            <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
          </View>
          <Text style={styles.orderTotal}>₹{item.totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.orderFooter}>
          <Text style={styles.itemsCount}>
            {getItemsCount(item)} item{getItemsCount(item) !== 1 ? 's' : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Order History" />
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>
            Your order history will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
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
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  itemsCount: {
    fontSize: 14,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

