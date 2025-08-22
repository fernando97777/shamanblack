import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabHome from '@/screens/tabs';
import ConfigUser from '@/screens/tabs/config-user';
import ListOrders from '@/screens/tabs/list-orders';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ff6b35',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen
        name='TabHome'
        component={TabHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? 'home' : 'home-outline';
            return (
              <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                <Ionicons name={iconName} size={20} color={focused ? 'white' : color} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name='ListOrders'
        component={ListOrders}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? 'list' : 'list-outline';
            return (
              <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                <Ionicons name={iconName} size={20} color={focused ? 'white' : color} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name='ConfigUser'
        component={ConfigUser}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? 'person' : 'person-outline';
            return (
              <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                <Ionicons name={iconName} size={20} color={focused ? 'white' : color} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    backgroundColor: '#ff6b35',
  },
});

export default TabNavigator;
