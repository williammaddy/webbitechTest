import React, { useState, createContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import ProductDetailScreen from './screens/ProductDetail';

export const CartContext = createContext({
  cartCount: 3,
  addToCart: () => {},
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Generic Placeholder for non-Home tabs
function PlaceholderScreen({ name, icon }) {
  return (
    <SafeAreaView style={styles.placeholderContainer}>
      <View style={styles.placeholderBadge}>
        <Ionicons name={icon} size={40} color="#E94B4B" />
      </View>
      <Text style={styles.placeholderTitle}>{name}</Text>
      <Text style={styles.placeholderSubtitle}>This section is coming soon!</Text>
    </SafeAreaView>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E94B4B',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Transaction') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size || 22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen name="Wishlist">
        {() => <PlaceholderScreen name="Wishlist" icon="heart-outline" />}
      </Tab.Screen>
      <Tab.Screen name="Transaction">
        {() => <PlaceholderScreen name="Transaction" icon="receipt-outline" />}
      </Tab.Screen>
      <Tab.Screen name="Notification">
        {() => <PlaceholderScreen name="Notification" icon="notifications-outline" />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <PlaceholderScreen name="Profile" icon="person-outline" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(3);

  const addToCart = (quantity = 1) => {
    setCartCount((prev) => prev + quantity);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  placeholderBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDE8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
