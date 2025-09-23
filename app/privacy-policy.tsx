import { useTheme } from '@/store';
import { Stack } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 48,
      gap: 24,
    },
    header: {
      gap: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
    },
    updated: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    section: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.borderLight,
      gap: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.textSecondary,
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Privacy Policy' }} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.updated}>Last updated: TBD</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coming Soon</Text>
            <Text style={styles.paragraph}>
              We are putting the finishing touches on our full privacy policy. This placeholder exists so you can review where those details will appear in a future update. No personal data is collected, stored, or shared by this app at this stage.
            </Text>
            <Text style={styles.paragraph}>
              If you have immediate questions about how your information is handled, reach out to the team and we will be happy to help.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
