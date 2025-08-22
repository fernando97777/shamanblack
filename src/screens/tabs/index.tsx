import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Alert,
  RefreshControl,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Animated, { SlideInDown, FadeInUp, BounceIn } from 'react-native-reanimated';
import CategoryList from '@/components/category-list';
import CategoryService from '@/services/category-service';
import ProductService from '@/services/product-service';

interface Category {
  id: number;
  name: string;
  image: string;
}

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

interface ProductsResponse {
  category: CategoryInfo;
  products: Product[];
  total_products: number;
}

const TabHome = () => {
  // Estados para categorías
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Estados para productos
  const [productsData, setProductsData] = useState<ProductsResponse | null>(null);
  const [productsLoading, setProductsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const bannerData = [
    {
      id: 1,
      title: '50% OFF',
      subtitle: 'All salad and Pasta',
      description: 'Use code Madang50',
      colorStart: '#ff7e5f',
      colorEnd: '#feb47b',
      image: require('../../assets/images/ensalada3.png'),
    },
    {
      id: 2,
      title: '10% OFF',
      subtitle: 'En parrilladas',
      description: 'Usa el codigo Parri90',
      colorStart: '#d49425ff',
      colorEnd: '#feb47b',
      image: require('../../assets/images/ensalada3.png'),
    },
  ];

  const loadCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await CategoryService.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].id);
        }
      } else {
        console.error('Error loading categories:', response.error);
        Alert.alert('Error', 'No se pudieron cargar las categorías');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Error de conexión al cargar categorías');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const loadProducts = async (categoryId: number) => {
    setProductsLoading(true);
    try {
      const response = await ProductService.getProductsByCategory(categoryId);
      if (response.success && response.data) {
        setProductsData(response.data);
      } else {
        console.error('Error loading products:', response.error);
        setProductsData(null);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProductsData(null);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleProductPress = (product: Product) => {
    console.log('Producto seleccionado:', product);
    Alert.alert(product.name, `Precio: $${parseFloat(product.price).toFixed(2)}\nCategoría: ${product.category_name}`, [
      { text: 'Cerrar', style: 'cancel' },
      { text: 'Ver detalles', onPress: () => console.log('Ver detalles del producto') },
    ]);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Agregando al carrito:', product);
    Alert.alert('¡Agregado!', `${product.name} se agregó al carrito`, [{ text: 'OK' }]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCategories();
    if (selectedCategory > 0) {
      await loadProducts(selectedCategory);
    }
    setRefreshing(false);
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => {
    const productImage = item.image_url || item.image;

    return (
      <Animated.View entering={SlideInDown.delay(index * 100).springify()} style={styles.productCard}>
        <TouchableOpacity onPress={() => handleProductPress(item)} activeOpacity={0.8} style={styles.productTouchable}>
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

              <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton} activeOpacity={0.8}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyProducts = () => (
    <Animated.View entering={FadeInUp.delay(500)} style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🍽️</Text>
      <Text style={styles.emptyTitle}>No hay productos</Text>
      <Text style={styles.emptyMessage}>No se encontraron productos en esta categoría</Text>
    </Animated.View>
  );

  const renderLoadingProducts = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='#ff6b35' />
      <Text style={styles.loadingText}>Cargando productos...</Text>
    </View>
  );

  const renderCategoryHeader = () => {
    if (!productsData?.category) {
      return null;
    }

    return (
      <Animated.View entering={FadeInUp.delay(200)} style={styles.categoryHeader}>
        <Image source={{ uri: productsData.category.image }} style={styles.categoryImage} resizeMode='cover' />
        <View style={styles.categoryHeaderInfo}>
          <Text style={styles.categoryTitle}>{productsData.category.name}</Text>
          <Text style={styles.productCount}>
            {productsData.products.length} producto{productsData.products.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </Animated.View>
    );
  };

  // Crear un array con todos los elementos para el FlatList
  const flatListData = [
    { type: 'header', data: null },
    { type: 'banner', data: bannerData },
    { type: 'categories', data: categories },
    { type: 'categoryHeader', data: productsData?.category },
    { type: 'products', data: productsData?.products || [] },
  ];

  const renderItem = ({ item }: { item: any }) => {
    switch (item.type) {
      case 'categories':
        return (
          <CategoryList
            data={item.data}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            loading={categoriesLoading}
          />
        );

      case 'categoryHeader':
        return renderCategoryHeader();

      case 'products':
        if (productsLoading) {
          return renderLoadingProducts();
        }

        if (item.data.length === 0) {
          return renderEmptyProducts();
        }

        return (
          <View style={styles.productsGrid}>
            {item.data.map((product: Product, index: number) => (
              <View key={product.id} style={styles.productWrapper}>
                {renderProduct({ item: product, index })}
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory > 0) {
      loadProducts(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#f5f5f7' />

      <FlatList
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 80,
  },
  flatListContent: {
    flexGrow: 1,
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
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
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
    paddingHorizontal: 20,
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
  },
  loadingContainer: {
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

export default TabHome;
