import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';
import Colors from '../styles/colors';

import { HighLightRow, TabTitle } from './styles';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        inactiveTintColor: Colors.background[1],
        activeTintColor: Colors.title, 
        activeBackgroundColor: Colors.background[3],
        inactiveBackgroundColor: Colors.background[3],
        tabStyle: { 
          position: 'relative',
          flex: 1, 
          flexDirection: "row", 
          alignItems: 'center', 
          justifyContent: 'center' ,
        },
        style: {
          borderTopWidth: 0,
          borderTopColor: Colors.background[1],
          height: 56,
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <>
              { focused &&  <HighLightRow style={{ backgroundColor: color }} />}
              <Ionicons size={28} name="home" color={color} />
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
              { focused &&  <HighLightRow style={{ backgroundColor: color }} />}
              <Ionicons size={28} name="heart" color={color} />
              <TabTitle style={{ color }}>Favorites</TabTitle>
            </>
          )
        }}
      />               
    </BottomTab.Navigator>
  );
}
