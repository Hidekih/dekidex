import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../styles/colors';
import useColorScheme from '../hooks/useColorScheme';
import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';
import { BottomTabParamList } from '../utils/types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].tint, 
        activeBackgroundColor: Colors[colorScheme].tabFocused,
        inactiveBackgroundColor: Colors[colorScheme].tabDefault,
        tabStyle: { 
          flex: 1, 
          flexDirection: "row", 
          alignItems: 'center', 
          justifyContent: 'center' ,
          
        },
        style: {
          borderTopWidth: 2,
          borderTopColor: Colors[colorScheme].tabFocused,
        }
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={Home}
        
        options={{
          tabBarLabel: ({ focused, color }) => (
            <>
              <Ionicons size={30} name="ios-list" color={color} />
              <Text style={{ color, marginLeft: 8, fontWeight: '700', fontSize: 18 }}>Pokedex</Text>
            </>
          )
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={Favorites}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <>
              <Ionicons size={30} name="heart" color={color} />
              <Text style={{ color, marginLeft: 8, fontWeight: '700', fontSize: 18 }}>Favorites</Text>
            </>
          )
        }}
      />               
    </BottomTab.Navigator>
  );
}

// const TabOneStack = createStackNavigator<TabOneParamList>();

// function Home() {
//   return (
//     <TabOneStack.Navigator>
//       <TabOneStack.Screen
//         name="TabOneScreen"
//         component={TabOneScreen}
//         options={{ headerShown: false }}
//       />
//     </TabOneStack.Navigator>
//   );
// }

// const TabTwoStack = createStackNavigator<TabTwoParamList>();

// function TabTwoNavigator() {
//   return (
//     <TabTwoStack.Navigator>
//       <TabTwoStack.Screen
//         name="TabTwoScreen"
//         component={TabTwoScreen}
//         options={{ headerTitle: 'Tab Two Title' }}
//       />
//     </TabTwoStack.Navigator>
//   );
// }
