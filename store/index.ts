import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { AppSettings, ConversionPair } from '../types';

const storage = new MMKV();

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
}

const defaultSettings: AppSettings = {
  theme: 'system',
  decimalFormat: '.',
  precision: 3,
  hapticsEnabled: true,
  analyticsEnabled: false
};

export const useAppStore = create<AppStore>((set, get) => ({
  settings: (() => {
    try {
      const stored = storage.getString('settings');
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  })(),
  
  favorites: (() => {
    try {
      const stored = storage.getString('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })(),
  
  history: (() => {
    try {
      const stored = storage.getString('history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })(),

  updateSettings: (newSettings) => {
    const settings = { ...get().settings, ...newSettings };
    set({ settings });
    storage.set('settings', JSON.stringify(settings));
  },

  addFavorite: (pair) => {
    const favorites = [...get().favorites, { ...pair, isFavorite: true }];
    set({ favorites });
    storage.set('favorites', JSON.stringify(favorites));
  },

  removeFavorite: (id) => {
    const favorites = get().favorites.filter(f => f.id !== id);
    set({ favorites });
    storage.set('favorites', JSON.stringify(favorites));
  },

  addToHistory: (pair) => {
    const history = [pair, ...get().history.filter(h => h.id !== pair.id)].slice(0, 50);
    set({ history });
    storage.set('history', JSON.stringify(history));
  },

  clearHistory: () => {
    set({ history: [] });
    storage.set('history', JSON.stringify([]));
  }
}));