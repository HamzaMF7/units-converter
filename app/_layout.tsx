import { useAppStore } from '@/store';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {

  const [isLoading, setIsLoading] = useState(true);
  const initializeStore = useAppStore(state => state.initializeStore);

   useEffect(() => {
    const loadAppData = async () => {
      try {
        await initializeStore();
      } catch (error) {
        console.warn('Failed to initialize app store:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppData();
  }, [initializeStore]);

    if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="converter/[categoryId]" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Converter'
          }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}