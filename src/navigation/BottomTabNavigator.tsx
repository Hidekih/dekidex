import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';

import { TabContent, TabTitle } from './styles';
import { useTheme } from 'styled-components';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        inactiveTintColor: '#7A7776',
        activeTintColor: '#f9f9f9', 
        tabStyle: { 
          position: 'relative',
          flex: 1, 
          flexDirection: "row", 
          alignItems: 'center', 
          justifyContent: 'center',
        },
        style: {
          elevation: 0,
          borderTopWidth: 0,
          height: 54,
          backgroundColor: theme.background2,
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <TabContent style={{ borderTopLeftRadius: 16 }}>
              { focused ? (
                <Ionicons size={24} name="home-sharp" color={color} />
              ) : (
                <Ionicons size={24} name="home-outline" color={color} />
              )}
              <TabTitle style={{ color }}>Home</TabTitle>
            </TabContent>
          )
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <TabContent style={{ borderTopRightRadius: 16 }}>
              { focused ? (
                <Ionicons size={24} name="heart" color={color} />
              ) : (
                <Ionicons size={24} name="heart-outline" color={color} />
              )}
              <TabTitle style={{ color }}>Favorites</TabTitle>
            </TabContent>
          )
        }}
      />               
    </BottomTab.Navigator>
  );
}
