import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Animated, { SlideInDown, FadeInUp, BounceIn } from 'react-native-reanimated';

// Interfaces para los productos
interface Product {
  id: number;
  name: string;
  price: string;
  image: string | null;
  image_url: string | null;
  category: number;
  category_name: string;
}

interface CategoryInfo {
  id: number;
  name: string;
  image: string;
}

interface ProductListProps {
  products: Product[];
  categoryInfo: CategoryInfo | null;
  loading?: boolean;
  onProductPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, categoryInfo, loading = false, onProductPress, onAddToCart }) => {
  const renderProduct = ({ item, index }: { item: Product; index: number }) => {
    const productImage = item.image_url || item.image;

    return (
      <Animated.View entering={SlideInDown.delay(index * 100).springify()} style={styles.productCard}>
        <TouchableOpacity onPress={() => onProductPress?.(item)} activeOpacity={0.8} style={styles.productTouchable}>
          <View style={styles.productImageContainer}>
            {productImage ? (
              <Image source={{ uri: productImage }} style={styles.productImage} resizeMode='cover' />
            ) : (
              <Animated.View entering={BounceIn.delay(300 + index * 100)} style={styles.placeholderImage}>
                <Text style={styles.placeholderEmoji}>🍽️</Text>
              </Animated.View>
            )}
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.categoryLabel}>{item.category_name}</Text>

            <View style={styles.productFooter}>
              <Text style={styles.productPrice}>${parseFloat(item.price).toFixed(2)}</Text>

              <TouchableOpacity onPress={() => onAddToCart?.(item)} style={styles.addButton} activeOpacity={0.8}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <Animated.View entering={FadeInUp.delay(500)} style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🍽️</Text>
      <Text style={styles.emptyTitle}>No hay productos</Text>
      <Text style={styles.emptyMessage}>No se encontraron productos en esta categoría</Text>
    </Animated.View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='#ff6b35' />
      <Text style={styles.loadingText}>Cargando productos...</Text>
    </View>
  );

  if (loading) {
    return <View style={styles.container}>{renderLoadingState()}</View>;
  }

  return (
    <View style={styles.container}>
      {categoryInfo && (
        <Animated.View entering={FadeInUp.delay(200)} style={styles.categoryHeader}>
          <Image source={{ uri: categoryInfo.image }} style={styles.categoryImage} resizeMode='cover' />
          <View style={styles.categoryHeaderInfo}>
            <Text style={styles.categoryTitle}>{categoryInfo.name}</Text>
            <Text style={styles.productCount}>
              {products.length} producto{products.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </Animated.View>
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={[styles.productsList, products.length === 0 && styles.emptyList]}
        columnWrapperStyle={products.length > 0 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginBottom: 50,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 16,
  },
  categoryHeaderInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  productsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productTouchable: {
    padding: 12,
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 32,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 18,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ff6b35',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff6b35',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});

export default ProductList;
