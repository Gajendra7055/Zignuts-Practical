import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../components/Header';
import {Button} from '../components/Button';
import {Modal} from '../components/Modal';
import {useApp} from '../context/AppContext';
import {ProductDetailsScreenProps} from '../types/navigation';

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {product} = route.params;
  const {user, addToCart} = useApp();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    addToCart(product);
    Alert.alert('Success', 'Product added to cart!');
  };

  const handleLoginPress = () => {
    setShowLoginModal(false);
    // Navigate to root stack Login screen
    navigation.getParent()?.getParent()?.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Product Details"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <Image source={{uri: product.image}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          style={styles.addButton}
        />
      </View>

      <Modal
        visible={showLoginModal}
        title="You need to login to continue"
        onClose={() => setShowLoginModal(false)}
        primaryButtonText="Login"
        secondaryButtonText="Cancel"
        onPrimaryPress={handleLoginPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#666666',
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 16,
  },
  ratingContainer: {
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: '#666666',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addButton: {
    width: '100%',
  },
});

