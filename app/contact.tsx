import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Linking, 
  Animated,
  Platform 
} from 'react-native';
import { Stack } from 'expo-router';
import { Colors, Spacing, Layout } from '@/constants/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Linkedin, Instagram, Facebook } from 'lucide-react-native';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  const handleSubmit = () => {
    const subject = encodeURIComponent('Website Contact');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    const mailtoUrl = `mailto:info@legallyyes.com?subject=${subject}&body=${body}`;
    
    Linking.openURL(mailtoUrl).catch((err) => {
      console.error('Error opening email client:', err);
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Header />
        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.titleSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY }],
              }
            ]}
          >
            <Text style={styles.pageTitle}>Get in Touch</Text>
            <View style={styles.titleUnderline}>
              <View style={styles.shimmerLine} />
            </View>
          </Animated.View>

          <View style={styles.contactInfoSection}>
            <View style={styles.contactInfoContainer}>
              <View style={styles.contactInfoColumn}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>info@legallyyes.com</Text>
              </View>

              <View style={styles.contactInfoColumn}>
                <Text style={styles.contactLabel}>Phone (Ghana)</Text>
                <Text style={styles.contactValue}>+233 256894465</Text>
              </View>

              <View style={styles.contactInfoColumn}>
                <Text style={styles.contactLabel}>Phone (Nigeria)</Text>
                <Text style={styles.contactValue}>+234 8149990849</Text>
              </View>

              <View style={styles.socialSection}>
                <Text style={styles.contactLabel}>Connect with us</Text>
                <View style={styles.socialIcons}>
                  <TouchableOpacity style={styles.socialIcon}>
                    <Linkedin size={24} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialIcon}>
                    <Instagram size={24} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialIcon}>
                    <Facebook size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.formTitle}>Send us a Message</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="How can we help you?"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ctaStrip}>
            <Text style={styles.ctaText}>
              We&apos;re here to support your legal journey. Reach out to us anytime.
            </Text>
          </View>

          <Footer />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    maxWidth: '100%',
    overflow: 'hidden',
    paddingBottom: 0,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    marginBottom: 0,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'web' ? Layout.headerHeight.desktop : Layout.headerHeight.mobile,
    maxWidth: '100%',
    paddingBottom: 0,
    marginBottom: 0,
    flexGrow: 1,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxxl,
  },
  pageTitle: {
    fontSize: 48,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  titleUnderline: {
    width: 100,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  shimmerLine: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  contactInfoSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxxl,
    marginHorizontal: Spacing.xl,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    marginBottom: Spacing.xxxl,
  },
  contactInfoContainer: {
    gap: Spacing.xxl,
  },
  contactInfoColumn: {
    gap: Spacing.sm,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactValue: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
  },
  socialSection: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(253, 82, 0, 0.1)',
      } as any,
    }),
  },
  formSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxxl,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.xxl,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.xxl,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      } as any,
    }),
  },
  inputGroup: {
    marginBottom: Spacing.xl,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Colors.deepCharcoal,
    backgroundColor: Colors.white,
  },
  textArea: {
    minHeight: 120,
    paddingTop: Spacing.md,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
    marginTop: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 8px rgba(253, 82, 0, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      } as any,
    }),
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700' as const,
  },
  ctaStrip: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
    marginVertical: Spacing.xxxl,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 18,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
  },
});
