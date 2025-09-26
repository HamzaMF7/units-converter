import { useHaptics } from '@/hooks/useHaptics';
import { useTheme } from '@/store';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle
}) => {
  const { impact } = useHaptics();
  const { colors, isDark } = useTheme();

  const handlePress = () => {
    if (!disabled && !loading) {
      impact(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const variantContainerStyle = React.useMemo(() => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.primary,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.35 : 0.15,
          shadowRadius: 6,
        };
    }
  }, [colors.primary, colors.surface, colors.border, variant, isDark]);

  const variantTextColor = React.useMemo(() => {
    switch (variant) {
      case 'secondary':
        return colors.text;
      case 'ghost':
        return colors.primary;
      case 'primary':
      default:
        return colors.onPrimary;
    }
  }, [colors.onPrimary, colors.primary, colors.text, variant]);

  const spinnerColor = React.useMemo(() => (
    variant === 'primary' ? colors.onPrimary : colors.primary
  ), [variant, colors.onPrimary, colors.primary]);

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[size],
        variantContainerStyle,
        (disabled || loading) && styles.disabled,
        style
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <Text style={[styles.text, { color: variantTextColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 52,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});
