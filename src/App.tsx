import './styles/global.css';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FONTS } from './constants/fonts';
import AppNavigation from './navigation/app-navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts(FONTS);

  const onLayoutRootView = useCallback(async () => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, [fontsLoaded, error]);

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <AppNavigation />
    </SafeAreaProvider>
  );
}
