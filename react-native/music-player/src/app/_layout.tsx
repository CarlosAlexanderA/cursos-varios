import {useLogTrackPlaterState} from '@/hooks/useLogTrackPlaterState';
import {useSetupTrackPlayer} from '@/hooks/useSetupTrackPlayer';
import {SplashScreen, Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import React, {useCallback} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const handelTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);
  useSetupTrackPlayer({
    onLoad: handelTrackPlayerLoaded,
  });

  useLogTrackPlaterState();

  return (
    <SafeAreaProvider>
      <RootNavigation />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
};
