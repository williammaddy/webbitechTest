import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../App';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params || {};
  const { cartCount, addToCart } = useContext(CartContext);

  // Fallback defaults if route param is missing
  const images = product?.images || [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&auto=format&fit=crop&q=80',
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const sizes = product?.sizes || [
    { size: 'EU 36.5', available: true },
    { size: 'EU 37', available: true },
    { size: 'EU 37.5', available: false },
    { size: 'EU 38', available: true },
  ];

  const [selectedSize, setSelectedSize] = useState(
    sizes.find((s) => s.available)?.size || 'EU 37'
  );

  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddToCart = () => {
    addToCart(quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        {/* Top Search bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#9CA3AF"
          />
          <Ionicons name="camera-outline" size={18} color="#6B7280" />
        </View>

        {/* Cart Icon with badge */}
        <TouchableOpacity style={styles.cartIconBtn} activeOpacity={0.7}>
          <Ionicons name="bag-handle-outline" size={22} color="#111827" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Toast Notification */}
      {addedNotice && (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.toastText}>Added {quantity} item(s) to cart!</Text>
        </View>
      )}

      {/* Content Scroll View */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Product Image Container */}
        <View style={styles.mainImageContainer}>
          <Image
            source={{ uri: images[selectedImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.heartCircle}
            onPress={() => setIsFavorite(!isFavorite)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? '#E94B4B' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>

        {/* 3 Image Thumbnails Row */}
        <View style={styles.thumbnailRow}>
          {images.slice(0, 3).map((imgUrl, index) => {
            const isSelected = selectedImageIndex === index;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnailWrapper,
                  isSelected && styles.thumbnailSelected,
                ]}
              >
                <Image source={{ uri: imgUrl }} style={styles.thumbnailImage} resizeMode="cover" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Product Details Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product?.name || 'Air Runner Sneakers'}</Text>

          {/* Rating & Reviews */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.ratingNumber}>{product?.rating || 4.8}</Text>
            </View>
            <Text style={styles.reviewsText}>({product?.reviews || 50} reviews)</Text>
            <Text style={styles.dotSeparator}>•</Text>
            <Text style={styles.soldText}>{product?.sold || '1.2k'} sold</Text>
          </View>

          {/* Price & Quantity Stepper */}
          <View style={styles.priceStepperRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{product?.price || '$129.00'}</Text>
              {product?.oldPrice && (
                <Text style={styles.oldPriceText}>{product.oldPrice}</Text>
              )}
            </View>

            {/* Stepper */}
            <View style={styles.stepperContainer}>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                activeOpacity={0.7}
              >
                <Text style={styles.stepperBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.stepperValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setQuantity(quantity + 1)}
                activeOpacity={0.7}
              >
                <Text style={styles.stepperBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Size Section */}
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionHeader}>Product Size</Text>
            <View style={styles.chipsRow}>
              {sizes.map((item, index) => {
                const isSelected = selectedSize === item.size;
                const isOutOfStock = !item.available;

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={isOutOfStock}
                    onPress={() => setSelectedSize(item.size)}
                    activeOpacity={0.8}
                    style={[
                      styles.sizeChip,
                      isSelected && styles.sizeChipSelected,
                      isOutOfStock && styles.sizeChipDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeChipText,
                        isSelected && styles.sizeChipTextSelected,
                        isOutOfStock && styles.sizeChipTextDisabled,
                      ]}
                    >
                      {item.size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Product Description Section */}
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionHeader}>Product Description</Text>
            <Text style={styles.descriptionText}>
              {product?.description ||
                'Crafted with lightweight breathable mesh and responsive cushioning for ultimate speed and all-day comfort. Features durable rubber traction outsoles designed for modern street performance.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions Bar */}
      <View style={styles.bottomActionBar}>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Ionicons name="bag-add-outline" size={20} color="#E94B4B" style={{ marginRight: 6 }} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowBtn} activeOpacity={0.8}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    paddingVertical: 0,
  },
  cartIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E94B4B',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  toast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  mainImageContainer: {
    width: '100%',
    height: 270,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    marginTop: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  heartCircle: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    marginBottom: 16,
  },
  thumbnailWrapper: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  thumbnailSelected: {
    borderColor: '#E94B4B',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    marginTop: 4,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  ratingNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: '#6B7280',
  },
  dotSeparator: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 6,
  },
  soldText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  priceStepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E94B4B',
  },
  oldPriceText: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepperBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  stepperValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 14,
  },
  sectionMargin: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    marginBottom: 8,
  },
  sizeChipSelected: {
    borderColor: '#E94B4B',
    backgroundColor: '#FDE8E8',
  },
  sizeChipDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    opacity: 0.6,
  },
  sizeChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  sizeChipTextSelected: {
    color: '#E94B4B',
    fontWeight: '700',
  },
  sizeChipTextDisabled: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  descriptionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  bottomActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  addToCartBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E94B4B',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  addToCartText: {
    color: '#E94B4B',
    fontSize: 15,
    fontWeight: '700',
  },
  buyNowBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#E94B4B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E94B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
