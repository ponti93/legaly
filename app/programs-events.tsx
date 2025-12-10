import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions, Image, Linking, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Colors, Spacing, Layout } from '@/constants/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const { width } = Dimensions.get('window');
const isWeb = width > 768;



const partnerLogos = [
  { uri: 'https://i.imgur.com/SmrYrvA.jpeg', key: 'partner1' },
  { uri: 'https://i.imgur.com/auEpI4Y.jpeg', key: 'partner2' },
  { uri: 'https://i.imgur.com/aQdAM3W.jpeg', key: 'partner3' },
  { uri: 'https://i.imgur.com/KHk4xqP.jpeg', key: 'partner4' },
  { uri: 'https://i.imgur.com/D1ySdzh.jpeg', key: 'partner5' },
  { uri: 'https://i.imgur.com/yuYnMeL.jpeg', key: 'partner6' },
  { uri: 'https://i.imgur.com/qlMKhrd.jpeg', key: 'partner7' },
];

interface EventCardProps {
  title: string;
  details: string[];
  backgroundColor?: string;
  borderPosition?: 'top' | 'left';
  imageUri?: string;
  buttonText?: string;
  buttonActive?: boolean;
  onButtonPress?: () => void;
}

function EventCard({ title, details, backgroundColor = Colors.white, borderPosition = 'top', imageUri, buttonText = "Registration Has Not Started Yet", buttonActive = false, onButtonPress }: EventCardProps) {
  const [isInView, setIsInView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => setIsInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInView) {
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
    }
  }, [isInView, fadeAnim, translateY]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.eventCard,
        {
          backgroundColor,
          opacity: fadeAnim,
          transform: [{ translateY }, { scale: scaleAnim }],
          borderTopWidth: borderPosition === 'top' ? 3 : 0,
          borderTopColor: borderPosition === 'top' ? Colors.primary : 'transparent',
          borderLeftWidth: borderPosition === 'left' ? 3 : 0,
          borderLeftColor: borderPosition === 'left' ? Colors.primary : 'transparent',
        },
      ]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
    >
      <Text style={styles.eventTitle}>{title}</Text>
      {imageUri && (
        <View style={styles.eventImageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.eventImage}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={styles.detailsContainer}>
        {details.map((detail, index) => (
          <Text key={index} style={styles.eventDetail}>
            {detail}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        style={[
          buttonActive ? styles.ctaButtonActive : styles.ctaButtonDisabled,
        ]}
        onPress={onButtonPress}
        disabled={!buttonActive}
        activeOpacity={0.8}
      >
        <Text style={buttonActive ? styles.ctaButtonActiveText : styles.ctaButtonDisabledText}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface SectionProps {
  children: React.ReactNode;
  delay?: number;
}

function AnimatedSection({ children, delay = 0 }: SectionProps) {
  const [isInView, setIsInView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    const timer = setTimeout(() => setIsInView(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isInView) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isInView, fadeAnim, translateY]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
}

export default function ProgramsEventsPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <AnimatedSection delay={100}>
            <View style={styles.photoBanner}>
              <View style={styles.bannerImageContainer}>
                <Image
                  source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/31dpymitu9pa8u10ezdmn' }}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <View style={styles.titleBlock}>
              <Text style={styles.pageTitle}>Programs & Events</Text>
              <View style={styles.titleUnderline} />
              <Text style={styles.pageSubtext}>
                At LegallyYes, we design programs and events that educate, connect, and empower lawyers
                across Africa. Our work is driven by collaboration, innovation, justice, and community.
              </Text>
            </View>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <View style={styles.flagshipSection}>
              <Text style={styles.sectionTitle}>Flagship Program</Text>
              <View style={styles.flagshipCard}>
                <Text style={styles.flagshipProgramName}>Legally Yes Justice Initiative</Text>
                <Text style={styles.flagshipDescription}>
                  The Legally Yes Justice Initiative is our impact-driven program supporting individuals
                  affected by unlawful detention, delayed justice, and legal neglect. This initiative
                  reflects our commitment to fairness, legal empowerment, and social transformation.
                </Text>
              </View>
            </View>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <View style={styles.eventsSection}>
              <Text style={styles.sectionTitleLarge}>Legally Yes Flagship Events</Text>
              <View style={styles.titleUnderline} />
              <Text style={styles.sectionSubtext}>
                These events reflect our mission to build a future-ready generation of legal professionals
                through education, innovation, and collaboration.
              </Text>
            </View>
          </AnimatedSection>

          <View style={styles.eventsGrid}>
            <EventCard
              title="Lawyers Hangout"
              backgroundColor={Colors.iceBlue}
              borderPosition="top"
              imageUri="https://i.imgur.com/0LksUGL.jpeg"
              buttonActive={true}
              buttonText="Register Now"
              onButtonPress={() => Linking.openURL('https://bit.ly/4iDDBFH')}
              details={[
                'A one-day, learning and networking event designed for legal CEOs, partners, and firm leaders. It is fun and information packed.  Hosted across Lagos, Abuja, Accra and other cities since 2022. Each edition brings together 70–200 top-tier lawyers for practical insights, strategic conversations, and high-value connections.',
                'Register for Accra Lawyers Hangout',
                'Date: February 21st, 2026',
                'Time: 10:00 am',
                'Venue: Sandbox Beach Club.',
               // 'Registration link:  https://bit.ly/4iDDBFH.',
              ]}
            />

            <EventCard
              title="Young Lawyers in Tech"
              backgroundColor={Colors.white}
              borderPosition="top"
              details={[
                ' A continent-wide virtual training designed to equip 0–5-year lawyers with cutting-edge AI and legal-tech skills. Through highly technical, hands-on workshops, the program aims to upskill over 5,000 young lawyers across Africa and open clear pathways into legal-tech careers.', 
                'Target Audience: 5,000+ young lawyers across Africa.', 
                'Outcome: AI upskilling and career pathways in legal tech.',
              ]}
            />

            <EventCard
              title="Legally Yes Annual Conference"
              backgroundColor={Colors.iceBlue}
              borderPosition="top"
              details={[
                'A high-energy, thought-leadership, Africa- wide conference designed to inspire young lawyers and emerging legal professionals. The event blends fun, dynamic learning with interactive sessions where the audience becomes part of the conversation.  ',
              ]}
            />

          
          </View>

          <AnimatedSection delay={600}>
            <View style={styles.partnersSection}>
              <Text style={styles.partnersTitle}>Our Partners</Text>
              <View style={styles.partnersContainer}>
                {partnerLogos.map((logo, index) => (
                  <Image
                    key={logo.key}
                    source={{ uri: logo.uri }}
                    style={styles.partnerLogo}
                    resizeMode="contain"
                  />
                ))}
              </View>
            </View>
          </AnimatedSection>

          <AnimatedSection delay={800}>
            <View style={styles.valuesStrip}>
              <View style={styles.valuesContainer}>
                {['Education', 'Networking', 'Impact', 'Collaboration'].map((value, index) => (
                  <View key={index} style={styles.valueItem}>
                    <Text style={styles.valueText}>{value}</Text>
                    <View style={styles.valueUnderline} />
                  </View>
                ))}
              </View>
            </View>
          </AnimatedSection>

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
    width: '100%',
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
    paddingTop: isWeb ? Layout.headerHeight.desktop : Layout.headerHeight.mobile,
    maxWidth: '100%',
    overflow: 'hidden',
    paddingBottom: 0,
    marginBottom: 0,
    flexGrow: 1,
  },
  titleBlock: {
    alignItems: 'center',
    paddingHorizontal: isWeb ? Spacing.xl : Spacing.lg,
    paddingVertical: isWeb ? Spacing.xxxl : Spacing.xxl,
    backgroundColor: Colors.iceBlue,
    width: '100%',
    maxWidth: '100%',
  },
  pageTitle: {
    fontSize: isWeb ? 56 : 34,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.xl,
  },
  pageSubtext: {
    fontSize: isWeb ? 20 : 15,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    lineHeight: isWeb ? 28 : 24,
    maxWidth: 800,
  },
  flagshipSection: {
    paddingHorizontal: isWeb ? Spacing.xl : Spacing.lg,
    paddingVertical: isWeb ? Spacing.xxxl : Spacing.xxl,
    width: '100%',
    maxWidth: '100%',
  },
  sectionTitle: {
    fontSize: isWeb ? 36 : 26,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  flagshipCard: {
    backgroundColor: Colors.white,
    borderLeftWidth: isWeb ? 4 : 3,
    borderLeftColor: Colors.primary,
    padding: isWeb ? Spacing.xl : Spacing.lg,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  flagshipProgramName: {
    fontSize: isWeb ? 28 : 20,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  flagshipDescription: {
    fontSize: isWeb ? 18 : 15,
    color: Colors.deepCharcoal,
    lineHeight: isWeb ? 26 : 24,
  },
  eventsSection: {
    alignItems: 'center',
    paddingHorizontal: isWeb ? Spacing.xl : Spacing.lg,
    paddingVertical: isWeb ? Spacing.xxxl : Spacing.xxl,
    width: '100%',
    maxWidth: '100%',
  },
  sectionTitleLarge: {
    fontSize: isWeb ? 48 : 32,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  sectionSubtext: {
    fontSize: isWeb ? 18 : 15,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    lineHeight: isWeb ? 26 : 24,
    maxWidth: 700,
    marginTop: Spacing.lg,
  },
  eventsGrid: {
    paddingHorizontal: isWeb ? Spacing.xl : Spacing.lg,
    paddingVertical: Spacing.xl,
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: isWeb ? Spacing.xl : Spacing.lg,
    width: '100%',
    maxWidth: '100%',
  },
  eventCard: {
    width: isWeb ? '47%' : '100%',
    minWidth: isWeb ? 350 : undefined,
    maxWidth: isWeb ? 550 : '100%',
    padding: isWeb ? Spacing.xl : Spacing.lg,
    borderRadius: isWeb ? 16 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  eventTitle: {
    fontSize: isWeb ? 26 : 20,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.lg,
    textAlign: 'left',
  },
  detailsContainer: {
    marginBottom: Spacing.xl,
  },
  eventDetail: {
    fontSize: isWeb ? 16 : 14,
    color: Colors.deepCharcoal,
    lineHeight: isWeb ? 24 : 22,
    marginBottom: Spacing.sm,
    textAlign: 'left',
  },
  ctaButtonDisabled: {
    backgroundColor: Colors.softGray,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    opacity: 0.6,
  },
  ctaButtonDisabledText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
  },
  ctaButtonActive: {
    backgroundColor: '#FF6B35', // Orange color
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  ctaButtonActiveText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white, // White text
  },
  valuesStrip: {
    backgroundColor: Colors.iceBlue,
    paddingVertical: isWeb ? Spacing.xxxl : Spacing.xxl,
    paddingHorizontal: isWeb ? Spacing.xl : Spacing.lg,
    marginTop: Spacing.xxxl,
    width: '100%',
    maxWidth: '100%',
  },
  valuesContainer: {
    flexDirection: isWeb ? 'row' : 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
    gap: isWeb ? Spacing.lg : Spacing.lg,
  },
  valueItem: {
    alignItems: 'center',
  },
  valueText: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.sm,
  },
  valueUnderline: {
    width: 60,
    height: 3,
    backgroundColor: Colors.primary,
  },
  photoBanner: {
    width: '100%',
    paddingHorizontal: isWeb ? Spacing.xl : Spacing.lg,
    marginTop: isWeb ? 40 : 24,
    marginBottom: isWeb ? Spacing.xxxl : Spacing.xxl,
  },
  bannerImageContainer: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    height: isWeb ? (width > 1024 ? 280 : 220) : (width > 480 ? 180 : 160),
    backgroundColor: Colors.white,
    borderRadius: isWeb ? 14 : 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  partnersSection: {
    alignItems: 'center',
    paddingHorizontal: isWeb ? Spacing.xl : Spacing.lg,
    paddingVertical: isWeb ? Spacing.xxxl : Spacing.xxl,
    width: '100%',
    maxWidth: '100%',
  },
  partnersTitle: {
    fontSize: isWeb ? 36 : 26,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  partnersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
    gap: isWeb ? Spacing.xl : Spacing.lg,
  },
  partnerLogo: {
    width: isWeb ? 140 : 80,
    height: isWeb ? 60 : 40,
    resizeMode: 'contain' as const,
  },
  eventImageContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: isWeb ? 250 : 150,
    resizeMode: 'contain' as const,
  },
});
