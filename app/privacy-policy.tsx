import { useTheme } from '@/store';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Privacy Policy for Quick Multiple: Units Converter
            </Text>
            <Text style={styles.updated}>
              Effective Date: September 26, 2025
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coming Soon</Text>
            <Text style={styles.paragraph}>
              Thank you for choosing Quick Multiple: Units Converter. This
              privacy policy is meant to inform you about our practices
              regarding data.
            </Text>
            <Text style={styles.paragraph}>
              Our core principle is simple: your privacy is paramount. This
              application was designed to be a simple, effective tool without
              compromising your personal information.
            </Text>
            <Text style={styles.paragraph}>
              Information We Do Not Collect
            </Text>
            <Text style={styles.paragraph}>
              We want to be crystal clear: Quick Multiple: Units Converter does not collect, store, or transmit any user data whatsoever.
            </Text>
            <Text style={styles.paragraph}>
              The application operates entirely offline on your device. All calculations and conversions happen locally. We do not collect:
            </Text>
            <Text style={styles.paragraph}>
                  Personal Information: We do not ask for or collect any personally identifiable information like your name, email address, phone number, or contacts.
            </Text>
            <Text style={styles.paragraph}>
                  Usage Data: We do not track how you use the app, which units you convert, how often you open the app, or any other interaction data.
            </Text>
            <Text style={styles.paragraph}>
                  Device Information: We do not collect any information about your device, such as its model, operating system version, unique device identifiers, or IP address.
            </Text>
            <Text style={styles.paragraph}>
Data Sharing and Disclosure
            </Text>
            <Text style={styles.paragraph}>
              Since we do not collect any data, we have no data to share with anyone. We do not share, sell, rent, or trade your information with any third parties because we never collect it in the first place.
            </Text>
            <Text style={styles.paragraph}>
              Third-Party SDKs
            </Text>
            <Text style={styles.paragraph}>

Quick Multiple: Units Converter does not use any third-party Software Development Kits (SDKs) for advertising, analytics, or any other purpose. The application is self-contained to ensure your data remains completely private and on your device.
            </Text>
            <Text style={styles.paragraph}>
              Application Permissions
            </Text>
            <Text style={styles.paragraph}>
              Our application is designed to require the absolute minimum permissions necessary for it to function as a unit converter. We do not request permissions that could be used to access your personal information.

            </Text>
            <Text style={styles.paragraph}>
Children's Privacy

            </Text>
            <Text style={styles.paragraph}>
This application is not directed at anyone under the age of 13. Since our application does not collect any data whatsoever, we do not knowingly collect personally identifiable information from children.
            </Text>
            <Text style={styles.paragraph}>
Changes to This Privacy Policy
            </Text>
            <Text style={styles.paragraph}>
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page
            </Text>
            <Text style={styles.paragraph}>
Contact Us
            </Text>
            <Text style={styles.paragraph}>
If you have any questions or suggestions about this Privacy Policy, do not hesitate to contact us.
            </Text>
            <Text style={styles.paragraph}>
Email: [Your Support Email Address]
            </Text>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
