import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RootLayout() {
  useFrameworkReady();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{flex: 1}, {paddingTop: 0}]}>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="mandal-details"
            options={{headerShown: false}}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
