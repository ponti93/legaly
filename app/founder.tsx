import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Layout } from '@/constants/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const { width } = Dimensions.get('window');

export default function FounderPage() {
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
          <HeroSection />
          <BiographySection />
          <ContactSection />
          <PhotoPlaceholderSection />
          <DiscoverSection />
          <Footer />
        </ScrollView>
      </View>
    </>
  );
}

function HeroSection() {
  const imageAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const imageSlide = useRef(new Animated.Value(-50)).current;
  const textSlide = useRef(new Animated.Value(50)).current;

  const floatingShapes = useRef(
    Array.from({ length: 8 }).map(() => {
      const xPosition = Math.random() * width;
      const yAnim = new Animated.Value(Math.random() * 400);
      return {
        x: xPosition,
        y: yAnim,
        scale: Math.random() * 0.4 + 0.3,
        duration: (Math.random() * 8 + 12) * 1000,
      };
    })
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(imageSlide, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(textSlide, {
        toValue: 0,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    floatingShapes.forEach((shape) => {
      const animateShape = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(shape.y, {
              toValue: -30,
              duration: shape.duration,
              useNativeDriver: true,
            }),
            Animated.timing(shape.y, {
              toValue: 450,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      animateShape();
    });
  }, []);

  return (
    <View style={styles.heroContainer}>
      <LinearGradient
        colors={[Colors.secondary, '#f0faff', Colors.white]}
        style={styles.heroGradient}
      >
        {floatingShapes.map((shape, i) => (
          <View
            key={i}
            style={[
              styles.floatingShape,
              {
                left: shape.x,
              },
            ]}
          >
            <Animated.View
              style={{
                transform: [
                  { translateY: shape.y },
                  { scale: shape.scale },
                ],
              }}
            >
              <View style={styles.shapeDot} />
            </Animated.View>
          </View>
        ))}

        <View style={styles.heroContent}>
          <View style={styles.heroGrid}>
            <Animated.View
              style={[
                styles.heroImageContainer,
                {
                  opacity: imageAnim,
                  transform: [{ translateX: imageSlide }],
                },
              ]}
            >
              <View style={styles.imageGlowWrapper}>
                <Image
                  source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/0ve0dyccrox2eoil67p97' }}
                  style={styles.founderHeroImage}
                  resizeMode="cover"
                />
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.heroTextContainer,
                {
                  opacity: textAnim,
                  transform: [{ translateX: textSlide }],
                },
              ]}
            >
              <Text style={styles.founderName}>Rita S.A. Oruche</Text>
              
              <View style={styles.titlesContainer}>
                <View style={styles.titleRow}>
                  <View style={styles.titleBullet} />
                  <Text style={styles.founderTitle}>Principal Attorney, Bridgegold Legal</Text>
                </View>
                <View style={styles.titleRow}>
                  <View style={styles.titleBullet} />
                  <Text style={styles.founderTitle}>
                    Vice Chairman, NBA-SLP Technology, Media & Telecommunications Subcommittee
                  </Text>
                </View>
              </View>

              <Text style={styles.heroIntro}>
                Rita S.A. Oruche is a distinguished legal professional with extensive
                experience across corporate, commercial, and land-related matters. She has
                advised individuals, startups, and corporations, helping clients navigate
                complex legal issues with clarity and confidence.
              </Text>
            </Animated.View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function BiographySection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.bioContainer}>
      <Animated.View
        style={[
          styles.bioCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.bioLeftBorder} />
        <View style={styles.bioContent}>
          <View style={styles.bioHeader}>
            <Text style={styles.bioTitle}>Biography</Text>
            <View style={styles.bioUnderline} />
          </View>
          <Text style={styles.bioText}>
            Rita brings years of experience advising individuals, startups, and established
            corporations across a broad range of legal matters, including corporate and
            commercial transactions, land matters, and dispute-related challenges. She is
            deeply committed to legal innovation, client-focused solutions, and the
            advancement of young lawyers across Africa. Her leadership and vision are
            foundational to the mission and work of LegallyYes.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
function ContactSection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: 300,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, []);

  const handleContact = () => {
    Linking.openURL('mailto:info@legallyyes.com?subject=Contact Rita');
  };

  return (
    <View style={styles.contactContainer}>
      <Animated.View
        style={[
          styles.contactContent,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.contactHeading}>Get in Touch with Our Founder</Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContact}
          activeOpacity={0.8}
        >
          <Text style={styles.contactButtonText}>Contact Rita</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  
  );
}
function PhotoPlaceholderSection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.photoPlaceholderContainer}>
      <Animated.View
        style={[
          styles.photoPlaceholder,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/7v3yyp7lt4jlmzq8j47j6' }}
          style={styles.photoPlaceholderImage}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

function DiscoverSection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: 400,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, []);

  const handleExplore = () => {
    router.push('/what-we-do');
  };

  return (
    <Animated.View style={[styles.discoverContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.discoverText}>
        Discover what we do and how we shape the future of legal practice.
      </Text>
      <TouchableOpacity
        style={styles.discoverButton}
        onPress={handleExplore}
        activeOpacity={0.8}
      >
        <Text style={styles.discoverButtonText}>Explore Our Work</Text>
      </TouchableOpacity>
      <Text style={styles.valueText}>
        Committed to excellence, collaboration, and innovation in Africa&apos;s legal
        ecosystem.
      </Text>
    </Animated.View>
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
    paddingTop: Platform.OS === 'web' ? Layout.headerHeight.desktop : Layout.headerHeight.mobile,
    maxWidth: '100%',
    paddingBottom: 0,
    marginBottom: 0,
    flexGrow: 1,
  },

  heroContainer: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  heroGradient: {
    flex: 1,
    position: 'relative',
  },
  floatingShape: {
    position: 'absolute',
  },
  shapeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    opacity: 0.15,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl * 1.5,
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
    maxWidth: '100%',
  },
  heroGrid: {
    flexDirection: Platform.OS === 'web' && width > 768 ? 'row' : 'column',
    alignItems: 'center',
    gap: Spacing.xxxl,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  heroImageContainer: {
    flex: Platform.OS === 'web' && width > 768 ? 1 : undefined,
    width: Platform.OS === 'web' && width > 768 ? undefined : '100%',
    maxWidth: Platform.OS === 'web' && width > 768 ? 380 : 320,
    alignSelf: 'center',
  },
  imageGlowWrapper: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  founderHeroImage: {
    width: '100%',
    height: '100%',
  },
  heroTextContainer: {
    flex: Platform.OS === 'web' && width > 768 ? 1 : undefined,
    width: '100%',
  },
  founderName: {
    fontSize: Platform.OS === 'web' ? 48 : 36,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.lg,
    lineHeight: Platform.OS === 'web' ? 60 : 48,
  },
  titlesContainer: {
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  titleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
  },
  founderTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#555',
    flex: 1,
    lineHeight: 24,
  },
  heroIntro: {
    fontSize: 18,
    lineHeight: 32,
    color: Colors.deepCharcoal,
  },

  bioContainer: {
    paddingVertical: Spacing.xxxl * 1.5,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.white,
    width: '100%',
    maxWidth: '100%',
  },
  bioCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  bioLeftBorder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
    backgroundColor: Colors.primary,
  },
  bioContent: {
    padding: Spacing.xxxl,
    paddingLeft: Spacing.xxxl + 12,
  },
  bioHeader: {
    marginBottom: Spacing.xl,
  },
  bioTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.md,
  },
  bioUnderline: {
    width: 60,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  bioText: {
    fontSize: 18,
    lineHeight: 32,
    color: '#444',
  },

  contactContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.xxxl * 1.5,
    paddingHorizontal: Spacing.lg,
    width: '100%',
    maxWidth: '100%',
  },
  contactContent: {
    alignItems: 'center',
    maxWidth: 700,
    alignSelf: 'center',
  },
  contactHeading: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 42,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md + 4,
    paddingHorizontal: Spacing.xxxl,
    borderRadius: 8,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600' as const,
  },

  discoverContainer: {
    paddingVertical: Spacing.xxxl * 1.5,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
  },
  discoverText: {
    fontSize: 20,
    lineHeight: 30,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    maxWidth: 700,
    marginBottom: Spacing.xl,
    fontWeight: '600' as const,
  },
  discoverButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md + 4,
    paddingHorizontal: Spacing.xxxl,
    borderRadius: 8,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: Spacing.xxl,
  },
  discoverButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  valueText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic' as const,
    maxWidth: 700,
    marginTop: Spacing.lg,
  },

  photoPlaceholderContainer: {
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.white,
    width: '100%',
    maxWidth: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: Platform.select({
      web: width > 1024 ? 300 : width > 768 ? 240 : 200,
      default: width > 768 ? 280 : 200,
    }),
    maxWidth: 1200,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  photoPlaceholderImage: {
    width: '100%',
    height: '100%',
  },
});
