import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';
import Colors from '../styles/colors';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        inactiveTintColor: Colors.grayLight,
        activeTintColor: Colors.white, 
        activeBackgroundColor: Colors.black,
        inactiveBackgroundColor: Colors.gray,
        tabStyle: { 
          flex: 1, 
          flexDirection: "row", 
          alignItems: 'center', 
          justifyContent: 'center' ,
          
        },
        style: {
          borderTopWidth: 2,
          borderTopColor: Colors.black,
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        
        options={{
          tabBarLabel: ({ focused, color }) => (
            <>
              <Ionicons size={30} name="ios-list" color={color} />
              <Text 
                style={{ color, marginLeft: 8, fontWeight: '700', fontSize: 18 }}
              >
                Pokedex
              </Text>
            </>
          )
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <>
              <Ionicons size={30} name="heart" color={color} />
              <Text 
                style={{ color, marginLeft: 8, fontWeight: '700', fontSize: 18 }}
              >
                Favorites
              </Text>
            </>
          )
        }}
      />               
    </BottomTab.Navigator>
  );
}
