import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { AppSettings, ConversionPair } from '../types';

interface AppStore {
  settings: AppSettings;
  favorites: ConversionPair[];
  history: ConversionPair[];
  
  // Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  addFavorite: (pair: ConversionPair) => void;
  removeFavorite: (id: string) => void;
  addToHistory: (pair: ConversionPair) => void;
  clearHistory: () => void;
  resetAllData: () => void;
  initializeStore: () => Promise<void>;
}

const defaultSettings: AppSettings = {
  theme: 'system',
  decimalFormat: '.',
  precision: 3,
  hapticsEnabled: true
};

// Helper functions for AsyncStorage
const getStorageItem = async (key: string, defaultValue: any) => {
  try {
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save ${key} to storage:`, error);
  }
};

export const useAppStore = create<AppStore>((set, get) => ({
  settings: defaultSettings,
  favorites: [],
  history: [],

  // Initialize store with data from AsyncStorage
  initializeStore: async () => {
    const [settings, favorites, history] = await Promise.all([
      getStorageItem('settings', defaultSettings),
      getStorageItem('favorites', []),
      getStorageItem('history', [])
    ]);
    
    set({
      settings: { ...defaultSettings, ...settings },
      favorites,
      history
    });
  },

  updateSettings: async (newSettings) => {
    const settings = { ...get().settings, ...newSettings };
    set({ settings });
    await setStorageItem('settings', settings);
  },

  addFavorite: async (pair) => {
    const favorites = [...get().favorites, { ...pair, isFavorite: true }];
    set({ favorites });
    await setStorageItem('favorites', favorites);
  },

  removeFavorite: async (id) => {
    const favorites = get().favorites.filter(f => f.id !== id);
    set({ favorites });
    await setStorageItem('favorites', favorites);
  },

  addToHistory: async (pair) => {
    const history = [pair, ...get().history.filter(h => h.id !== pair.id)].slice(0, 50);
    set({ history });
    await setStorageItem('history', history);
  },

  clearHistory: async () => {
    set({ history: [] });
    await setStorageItem('history', []);
  },

  resetAllData: async () => {
    set({
      settings: defaultSettings,
      favorites: [],
      history: [],
    });

    await Promise.all([
      setStorageItem('settings', defaultSettings),
      setStorageItem('favorites', []),
      setStorageItem('history', []),
    ]);
  },
}));

const getSystemTheme = () => {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
};

export const useTheme = () => {
  const { settings } = useAppStore();
  
  const getActiveTheme = () => {
    if (settings.theme === 'system') {
      return getSystemTheme();
    }
    return settings.theme;
  };
  
  return {
    theme: getActiveTheme(),
    isDark: getActiveTheme() === 'dark',
    colors: getActiveTheme() === 'dark' ? darkColors : lightColors
  };
};

// color schemes
const lightColors = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  primary: '#3B82F6',
  primaryLight: '#EFF6FF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  errorLight: '#FEF2F2',

  // 🔑 new additions
  onPrimary: '#FFFFFF',  // text/icons on primary buttons
  onSurface: '#111827',  // text/icons on surfaces/cards
};

const darkColors = {
  background: '#111827',
  surface: '#1F2937',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  border: '#374151',
  borderLight: '#4B5563',
  primary: '#60A5FA',
  primaryLight: '#1E3A8A',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  errorLight: '#7F1D1D',

  // 🔑 new additions
  onPrimary: '#FFFFFF',  // white text on blue buttons still works
  onSurface: '#F9FAFB',  // text/icons on dark cards/surfaces
};
