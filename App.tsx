import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

import Themes from './src/styles/colors';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
    
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar backgroundColor={Themes.black} style="light" />
    </SafeAreaProvider>
  );
}
