import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { FadeIn, SlideInLeft, ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  colorStart: string;
  colorEnd: string;
  image: any;
}

const BannerCarousel: React.FC<{ data: BannerItem[] }> = ({ data }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const renderBanner = ({ item, index }: { item: BannerItem; index: number }) => (
    <Animated.View style={styles.bannerContainer} entering={SlideInLeft.delay(index * 300).springify()}>
      <LinearGradient colors={[item.colorStart, item.colorEnd]} style={styles.bannerCard}>
        <View style={styles.bannerImageContainer}>
          <Animated.View style={styles.foodCircle} entering={ZoomIn.delay(600 + index * 100).springify()}>
            <Image source={item.image} style={styles.bannerImage} />
          </Animated.View>
        </View>
        <Animated.View style={styles.bannerContent} entering={FadeIn.delay(400 + index * 150)}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>{item.description}</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <View style={styles.bannerSection}>
      <FlatList
        data={data}
        renderItem={renderBanner}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.bannerList}
        onMomentumScrollEnd={event => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
          setCurrentBanner(newIndex);
        }}
      />

      <Animated.View style={styles.pagination} entering={FadeIn.delay(800)}>
        {data.map((_, index) => (
          <Animated.View
            key={index}
            style={[styles.paginationDot, currentBanner === index && styles.paginationDotActive]}
            entering={ZoomIn.delay(900 + index * 100)}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerSection: {
    marginBottom: 30,
  },
  bannerContainer: {
    width: width - 40,
    marginRight: 15,
  },
  bannerCard: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  bannerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerSubtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -5,
  },
  bannerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: 'orange',
    fontSize: 12,
    fontWeight: '600',
  },
  bannerImageContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodCircle: {
    width: 100,
    height: 100,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bannerList: {
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d1d6',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#ff6b35',
  },
});

export default BannerCarousel;
