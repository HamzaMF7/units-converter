import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { useAppStore } from '@/store';

export const useHaptics = () => {
  const enabled = useAppStore(state => state.settings.hapticsEnabled);

  const impact = useCallback(async (style: Haptics.ImpactFeedbackStyle) => {
    if (!enabled) return;

    try {
      await Haptics.impactAsync(style);
    } catch (error) {
      console.warn('Failed to trigger haptic feedback:', error);
    }
  }, [enabled]);

  return { impact };
};
