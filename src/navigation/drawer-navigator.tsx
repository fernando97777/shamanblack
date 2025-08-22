// DrawerNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

// Importa tu TabNavigator existente
import TabNavigator from './tab-navigator'; // Tu archivo de tabs existente

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: 'gray',
        drawerStyle: {
          backgroundColor: '#f8f9fa',
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          // fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={TabNavigator}
        options={{
          drawerLabel: 'Inicio',
          title: 'ShamanBlack',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
          ),
          headerShown: false, // Los tabs manejan su propio header
        }}
      />
    </Drawer.Navigator>
  );
}
