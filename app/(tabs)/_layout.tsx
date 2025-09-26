import { useTheme } from '@/store';
import { Tabs } from 'expo-router';
import { Clock, Home, Settings, Star } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { colors, isDark } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Theming
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        // Floating style
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 10,
          height: 64,
          backgroundColor: colors.surface,
          borderRadius: 16,
          borderTopWidth: 0, // remove default hairline
          // subtle outline for light; stronger for dark
          borderWidth: 1,
          borderColor: isDark ? colors.border : colors.borderLight,
          margin: 10 ,

          // spacing
          paddingHorizontal: 8,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,

          // shadow/elevation (floating effect)
          shadowColor: isDark ? '#ffffff81' : '#000',
          shadowOpacity: isDark ? 0.4 : 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 12,
        },
        tabBarItemStyle: { margin: 4, borderRadius: 12 },
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
    
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Star size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
