import { useHaptics } from '@/hooks/useHaptics';
import { useAppStore, useTheme } from '@/store';
import * as Haptics from 'expo-haptics';
import {
  ChevronRight,
  Download,
  Globe,
  Info,
  Moon,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  Vibrate
} from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const settings = useAppStore(state => state.settings);
  const updateSettings = useAppStore(state => state.updateSettings);
  const resetAllData = useAppStore(state => state.resetAllData);
  const { colors } = useTheme();
  const { impact } = useHaptics();
  const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 24,
      marginBottom: 24 ,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      marginHorizontal: 20,
    },
    sectionContent: {
      backgroundColor: colors.surface,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.background, // was #F9FAFB
    },
    settingLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingIcon: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.borderLight, // was #F3F4F6
      borderRadius: 8,
      marginRight: 16,
    },
    settingText: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 2,
    },
    settingSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    settingRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 20,
    },
    footerText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 4,
    },
    footerSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });


  const handleThemeChange = (newTheme: 'system' | 'light' | 'dark') => {
    impact(Haptics.ImpactFeedbackStyle.Light);
    updateSettings({ theme: newTheme });
  };

  const handleHapticsToggle = (enabled: boolean) => {
    if (enabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {
        console.warn('Failed to trigger haptics while enabling feedback');
      });
    }
    updateSettings({ hapticsEnabled: enabled });
  };

  const handleAnalyticsToggle = (enabled: boolean) => {
    impact(Haptics.ImpactFeedbackStyle.Light);
    updateSettings({ analyticsEnabled: enabled });
  };

  const handleDecimalFormatToggle = () => {
    const newFormat = settings.decimalFormat === '.' ? ',' : '.';
    impact(Haptics.ImpactFeedbackStyle.Light);
    updateSettings({ decimalFormat: newFormat });
  };

  const handlePrecisionChange = () => {
    impact(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Decimal Precision',
      'Choose the number of decimal places for results',
      [
        { text: '2 decimals', onPress: () => updateSettings({ precision: 2 }) },
        { text: '3 decimals', onPress: () => updateSettings({ precision: 3 }) },
        { text: '4 decimals', onPress: () => updateSettings({ precision: 4 }) },
        { text: '6 decimals', onPress: () => updateSettings({ precision: 6 }) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all favorites, history, and reset settings to default. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            impact(Haptics.ImpactFeedbackStyle.Heavy);
            resetAllData();
          }
        }
      ]
    );
  };

  const handleExportData = () => {
    impact(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Export Data',
      'Feature coming soon! This will allow you to export your favorites and settings as a backup file.',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyPolicyPress = () => {
    impact(Haptics.ImpactFeedbackStyle.Light);
    router.push('/privacy-policy');
  };

  const getThemeIcon = () => {
    switch (settings.theme) {
      case 'dark': return <Moon size={20} color="#111827" />;
      case 'light': return <Sun size={20} color="#111827" />;
      default: return <Smartphone size={20} color="#111827" />;
    }
  };

  const getThemeLabel = () => {
    switch (settings.theme) {
      case 'dark': return 'Dark';
      case 'light': return 'Light';
      default: return 'System';
    }
  };

  const renderSettingSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightComponent?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>{icon}</View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightComponent}
        {onPress && <ChevronRight size={16} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your converter experience</Text>
        </View>

        {renderSettingSection('Appearance', (
          <>
            {renderSettingItem(
              getThemeIcon(),
              'Theme',
              `Currently using ${getThemeLabel().toLowerCase()} theme`,
              null,
              () => Alert.alert(
                'Choose Theme',
                'Select your preferred app theme',
                [
                  { text: 'System', onPress: () => handleThemeChange('system') },
                  { text: 'Light', onPress: () => handleThemeChange('light') },
                  { text: 'Dark', onPress: () => handleThemeChange('dark') },
                  { text: 'Cancel', style: 'cancel' }
                ]
              )
            )}
          </>
        ))}

        {renderSettingSection('Conversion', (
          <>
            {renderSettingItem(
              <Globe size={20} color="#111827" />,
              'Decimal Format',
              `Using "${settings.decimalFormat}" as decimal separator`,
              null,
              handleDecimalFormatToggle
            )}
            {renderSettingItem(
              <Info size={20} color="#111827" />,
              'Precision',
              `Showing ${settings.precision} decimal places`,
              null,
              handlePrecisionChange
            )}
          </>
        ))}

        {renderSettingSection('Experience', (
          <>
            {renderSettingItem(
              <Vibrate size={20} color="#111827" />,
              'Haptic Feedback',
              'Vibrate on button taps and gestures',
              <Switch
                value={settings.hapticsEnabled}
                onValueChange={handleHapticsToggle}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={settings.hapticsEnabled ? '#3B82F6' : '#F3F4F6'}
              />
            )}
          </>
        ))}

        {renderSettingSection('Privacy', (
          <>
            {renderSettingItem(
              <Info size={20} color="#111827" />,
              'Analytics',
              'Help improve the app with usage data',
              <Switch
                value={settings.analyticsEnabled}
                onValueChange={handleAnalyticsToggle}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={settings.analyticsEnabled ? '#3B82F6' : '#F3F4F6'}
              />
            )}
            {renderSettingItem(
              <Shield size={20} color="#111827" />,
              'Privacy Policy',
              'Read how we handle your data',
              null,
              handlePrivacyPolicyPress
            )}
          </>
        ))}

        {renderSettingSection('Data', (
          <>
            {renderSettingItem(
              <Download size={20} color="#111827" />,
              'Export Data',
              'Download your favorites and settings',
              null,
              handleExportData
            )}
            {renderSettingItem(
              <Trash2 size={20} color="#EF4444" />,
              'Clear All Data',
              'Remove all favorites, history, and reset settings',
              null,
              handleClearAllData
            )}
          </>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Units Converter v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for accurate conversions
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
