import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from "../Products";
import CreateProduct from '../CreateProduct';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000559',
        }
    }} >
      <Tab.Screen name="Productos" component={Products} options={{headerShown: false, tabBarIcon: () => (
          <MaterialIcons name="shopping-cart" size={24} color="white" />
        ),}}/>
      <Tab.Screen name="Agregar" component={CreateProduct} options={{headerShown: false, tabBarIcon: () => (
          <MaterialIcons name="add-shopping-cart" size={24} color="white" />
        ),}}/> 
    </Tab.Navigator>
  )
}

export default Main;