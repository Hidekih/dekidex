import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

import Colors from './src/styles/colors';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <StatusBar backgroundColor={Colors.black} style="light" />
      <Navigation />
    </SafeAreaView>
  );
}
