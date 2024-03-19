import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavouriteScreen from '../Screen/ProfileScreen/ProfileScreen';
import ProfileScreen from '../Screen/FaqScreen/FaqScreen';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../Utils/Colours';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,
      tabBarActiveTintColor:Colours.WHITE,
      tabBarStyle:[{
        position:'absolute',
        borderTopWidth:0
      }],
      tabBarBackground: () => (
        <BlurView
        intensity = {10}
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow:"hidden",
          backgroundColor: "rgba(34,34,39,0.45)",
        }}  />),
    }}>
      
        <Tab.Screen name='home'
        component={HomeScreen}
          options={{
            tabBarIcon:({color,size})=>(
              <Ionicons name="car-sport" size={size} color={color} />
            )
          }}/>
        <Tab.Screen name='favourites'
        component={FavouriteScreen}/>
        <Tab.Screen name='profile'
        component={ProfileScreen}/>
    </Tab.Navigator>
  )
}