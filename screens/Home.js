import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appData from '../data.json';
import { CartContext } from '../App';

export default function HomeScreen({ navigation }) {
  const [favorites, setFavorites] = useState({});
  const { cartCount } = useContext(CartContext);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderHeader = () => (
    <View style={styles.headerComponent}>
      {/* Search & Cart Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.cameraBtn}>
            <Ionicons name="camera-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.cartBtn}>
          <Ionicons name="bag-handle-outline" size={24} color="#111827" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Promotional Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerTitle}>Discover the perfect shopping journey!</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>Shop Now!</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
          }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Categories Card (4x2 Grid) */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionHeadingTitle}>Categories</Text>
        <View style={styles.categoriesCard}>
          <View style={styles.categoriesGrid}>
            {appData.categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryItem} activeOpacity={0.7}>
                <View style={styles.categoryIconCircle}>
                  <Ionicons name={cat.icon} size={22} color="#E94B4B" />
                </View>
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Recommended Header */}
      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>Recommended</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProductItem = ({ item }) => {
    const isFav = !!favorites[item.id];
    const imageUri = item.images ? item.images[0] : item.image;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        {/* Product Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.productImage} resizeMode="cover" />

          {item.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>New!</Text>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.heartCircle}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={18}
              color={isFav ? '#E94B4B' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>

        {/* Product Meta */}
        <View style={styles.productMeta}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>

          {/* Rating & Sold */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text style={styles.ratingValue}>{item.rating}</Text>
            <Text style={styles.soldText}>({item.sold} sold)</Text>
          </View>

          {/* Price Row */}
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{item.price}</Text>
            {item.oldPrice && <Text style={styles.oldPriceText}>{item.oldPrice}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={appData.products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerComponent: {
    paddingTop: 12,
  },
  /* Top Search & Cart */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    height: 44,
    paddingHorizontal: 14,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    height: '100%',
  },
  cameraBtn: {
    padding: 4,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E94B4B',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  /* Banner */
  banner: {
    backgroundColor: '#E94B4B',
    borderRadius: 20,
    height: 155,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  bannerLeft: {
    flex: 1.2,
    padding: 18,
    justifyContent: 'center',
    zIndex: 2,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
  },
  shopNowBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shopNowText: {
    color: '#E94B4B',
    fontSize: 13,
    fontWeight: '700',
  },
  bannerImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '48%',
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  /* Categories Section */
  categoriesSection: {
    marginBottom: 20,
  },
  sectionHeadingTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  categoriesCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginVertical: 8,
  },
  categoryIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FDE8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  /* Recommended Section Header */
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E94B4B',
  },
  /* Product Cards Grid */
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#111827',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  heartCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productMeta: {
    marginTop: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  soldText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E94B4B',
  },
  oldPriceText: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
});
