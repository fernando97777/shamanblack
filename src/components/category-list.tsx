import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Animated, { SlideInUp, SlideInLeft, BounceIn } from 'react-native-reanimated';

// Interfaz para las categorías (adaptada a tu API)
interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryListProps {
  data: Category[];
  selectedCategory: number;
  onSelectCategory: (categoryId: number) => void;
  loading?: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({ data, selectedCategory, onSelectCategory, loading = false }) => {
  // Colores de fondo rotativos para las categorías
  const backgroundColors = [
    '#ff9500', // Naranja para "All" o primera categoría
    '#e8f5e8', // Verde suave
    '#ffe8e8', // Rosa suave
    '#ffe8f0', // Rosa más fuerte
    '#e8f4ff', // Azul suave
    '#f0e8ff', // Púrpura suave
    '#fff8e8', // Amarillo suave
    '#e8fff8', // Verde menta
  ];

  const renderCategory = ({ item, index }: { item: Category; index: number }) => {
    const isSelected = item.id === selectedCategory;
    const backgroundColor = backgroundColors[index % backgroundColors.length];

    // Loading state
    if (loading) {
      return (
        <View style={styles.categoriesSection}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.seeAllText}>See All</Text>
          </View>

          <View style={styles.loadingContainer}>
            {[...Array(5)].map((_, index) => (
              <View key={index} style={styles.loadingItem}>
                <View style={[styles.loadingIcon, { backgroundColor: backgroundColors[index] }]} />
                <View style={styles.loadingText} />
              </View>
            ))}
          </View>
        </View>
      );
    }

    return (
      <Animated.View entering={SlideInUp.delay(index * 100).springify()}>
        <TouchableOpacity
          style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
          onPress={() => onSelectCategory(item.id)}
          activeOpacity={0.8}
        >
          <Animated.View
            entering={BounceIn.delay(600 + index * 150)}
            style={[styles.iconContainer, { backgroundColor }, isSelected && styles.iconContainerSelected]}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode='cover' />
            ) : (
              <Text style={styles.categoryIcon}>📦</Text>
            )}
          </Animated.View>
          <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>{item.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.categoriesSection}>
      <View style={styles.headerContainer}>
        <Animated.Text style={styles.sectionTitle} entering={SlideInLeft.delay(200)}>
          Categorias
        </Animated.Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesSection: {
    marginBottom: 32,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  seeAllText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    minWidth: 80,
  },
  categoryItemSelected: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainerSelected: {
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  loadingItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    minWidth: 80,
  },
  loadingIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginBottom: 8,
    opacity: 0.3,
  },
  loadingText: {
    width: 50,
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
});

export default CategoryList;
