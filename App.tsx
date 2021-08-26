import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native'

import { dark, light } from './src/global/styles/themes';

import useCachedResources from './src/hooks/useCachedResources';

import Navigation from './src/navigation';

export default function App() {
  const [ theme, setTheme ] = useState(light);
  const isLoadingComplete = useCachedResources();
  const deviceColorsSchema = useColorScheme();

  useEffect(() => {
    if (deviceColorsSchema) {
      setTheme(deviceColorsSchema === 'light' ? light : dark )
    }
  }, []);

  if (!isLoadingComplete) {
    return null;
  }
    
  return (
    <ThemeProvider theme={dark} >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.primary} style="light" />
        <Navigation />
      </SafeAreaView>
    </ThemeProvider>
  );
}
