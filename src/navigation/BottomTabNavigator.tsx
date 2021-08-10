import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';
import Colors from '../styles/colors';

import { TabTitle } from './styles';
import { Platform } from 'react-native';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        inactiveTintColor: Colors.background[1],
        activeTintColor: Colors.title, 
        activeBackgroundColor: Platform.OS === 'ios' ? Colors.background[2] : Colors.background[3],
        inactiveBackgroundColor: Platform.OS === 'ios' ? Colors.background[2] : Colors.background[3],
        tabStyle: { 
          position: 'relative',
          flex: 1, 
          flexDirection: "row", 
          alignItems: 'center', 
          justifyContent: 'center' ,
        },
        style: {
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: Platform.OS === 'ios' ? Colors.background[3] : Colors.background[2],
          height: 54,
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <>
              <Ionicons size={24} name="home" color={color} />
              <TabTitle style={{ color }}>Home</TabTitle>
            </>
          )
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <>
              <Ionicons size={24} name="heart" color={color} />
              <TabTitle style={{ color }}>Favorites</TabTitle>
            </>
          )
        }}
      />               
    </BottomTab.Navigator>
  );
}
