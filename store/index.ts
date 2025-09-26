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
  background: '#F5F7FA',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#475467',
  textMuted: '#98A2B3',
  border: '#D0D5DD',
  borderLight: '#E4E7EC',
  primary: '#2563EB',
  primaryLight: '#E0EAFF',
  success: '#16A34A',
  warning: '#F79009',
  error: '#D92D20',
  errorLight: '#FEE4E2',

  onPrimary: '#FFFFFF',
  onSurface: '#1F2937',
};

const darkColors = {
  background: '#0F172A',
  surface: '#1E293B',
  text: '#E2E8F0',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#334155',
  borderLight: '#475569',
  primary: '#4F83F1',
  primaryLight: '#1D4ED8',
  success: '#22C55E',
  warning: '#FACC15',
  error: '#F87171',
  errorLight: '#4A1D1F',

  onPrimary: '#FFFFFF',
  onSurface: '#E2E8F0',
};
