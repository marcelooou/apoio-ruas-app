import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AjudaScreen from '../screens/AjudaScreen';
import MapaScreen from '../screens/MapaScreen';
import DoacoesScreen from '../screens/DoacoesScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Navegação
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AjudaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AjudaScreen" component={AjudaScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MapaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MapaScreen" component={MapaScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const DoacoesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="DoacoesScreen" component={DoacoesScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const PerfilStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PerfilScreen" component={PerfilScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ajuda') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Doações') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2980b9',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Ajuda" component={AjudaStack} />
      <Tab.Screen name="Mapa" component={MapaStack} />
      <Tab.Screen name="Doações" component={DoacoesStack} />
      <Tab.Screen name="Perfil" component={PerfilStack} />
    </Tab.Navigator>
  );
}
