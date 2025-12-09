import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Layout } from '@/constants/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function HomePage() {
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
          <WhoWeAreSection />
          <CoreAreasSection />
          <ImpactStatsSection />
          <PartnerCTASection />
          <Footer />
        </ScrollView>
      </View>
    </>
  );
}

function HeroSection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const particles = useRef(
    Array.from({ length: 20 }).map(() => {
      const xPosition = Math.random() * width;
      const yAnim = new Animated.Value(Math.random() * 600);
      return {
        x: xPosition,
        y: yAnim,
        scale: Math.random() * 0.5 + 0.5,
        duration: (Math.random() * 10 + 15) * 1000,
      };
    })
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
    }).start();

    particles.forEach((particle) => {
      const animateParticle = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.y, {
              toValue: -50,
              duration: particle.duration,
              useNativeDriver: true,
            }),
            Animated.timing(particle.y, {
              toValue: 650,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      animateParticle();
    });
  }, []);

  const handleNewsletter = () => {
    Linking.openURL('mailto:info@legallyyes.com?subject=Newsletter Subscription');
  };

  const handlePartner = () => {
    Linking.openURL('mailto:partners@legallyyes.com?subject=Partnership Inquiry');
  };

  return (
    <View style={styles.heroContainer}>
      <LinearGradient
        colors={[Colors.deepCharcoal, '#1a1f2e', Colors.deepCharcoal]}
        style={styles.heroGradient}
      >
        {particles.map((particle, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: particle.x,
              },
            ]}
          >
            <Animated.View
              style={{
                transform: [
                  { translateY: particle.y },
                  { scale: particle.scale },
                ],
              }}
            >
              <View style={styles.particleDot} />
            </Animated.View>
          </View>
        ))}

        <View style={styles.heroGlowContainer}>
          <View style={styles.heroGlow} />
        </View>

        <View style={styles.heroContent}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text style={styles.heroHeadline}>
              Building the future of law through collaboration
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.heroCTAContainer,
              { opacity: buttonAnim },
            ]}
          >
            <TouchableOpacity
              style={[styles.ctaButton, styles.ctaPrimary]}
              onPress={handleNewsletter}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaPrimaryText}>Join our Newsletter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ctaButton, styles.ctaSecondary]}
              onPress={handlePartner}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaSecondaryText}>Partner With Us</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}

function WhoWeAreSection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }).start();
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  return (
    <View style={styles.whoWeAreContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Who We Are</Text>
          <View style={styles.titleUnderline} />
        </View>

        <Text style={styles.whoWeAreText}>
          Legally Yes is a legal-education and justice-impact organisation dedicated to
          strengthening Africa&apos;s legal ecosystem. We combine modern legal training and
          justice intervention to equip lawyers while advancing
          fair and equitable access to justice.
        </Text>
      </Animated.View>
    </View>
  );
}

function CoreAreasSection() {
  const areas = [
    {
      title: 'Education & Training',
      description:
        'Practical, tech-driven legal training designed for lawyers.',
    },
    {
      title: 'Networking & Collaboration',
      description:
        'Events and forums that connect lawyers with peers, mentors, and industry leaders.',
    },
    {
      title: 'Justice & Social Impact',
      description:
        'Targeted initiatives that support individuals affected by unlawful detention or delayed justice.',
    },
  ];

  return (
    <View style={styles.coreAreasContainer}>
      <Text style={styles.sectionTitle}>Core Areas</Text>
      <View style={styles.cardsGrid}>
        {areas.map((area, index) => (
          <CoreAreaCard key={index} {...area} delay={index * 200} />
        ))}
      </View>
    </View>
  );
}

function CoreAreaCard({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.coreAreaCard,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardTouchable}
      >
        <View style={styles.cardTopBorder} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function ImpactStatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    { value: 20000, suffix: '+', label: 'Community members' },
    { value: 12, suffix: '+', label: 'Countries in Africa' },
    { value: 56, suffix: '+', label: 'Partners & collaborators' },
  ];

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  return (
    <View style={styles.impactStatsContainer}>
      <LinearGradient
        colors={[Colors.deepCharcoal, '#1a1f2e']}
        style={styles.statsGradient}
      >
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 200}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

function StatCounter({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay,
      useNativeDriver: true,
    }).start();

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, delay]);

  return (
    <Animated.View style={[styles.statItem, { opacity: fadeAnim }]}>
      <Text style={styles.statValue}>
        {displayValue.toLocaleString()}
        {suffix}
      </Text>
      <View style={styles.statUnderline} />
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

function PartnerCTASection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePartner = () => {
    Linking.openURL('mailto:partners@legallyyes.com?subject=Partnership Inquiry');
  };

  return (
    <Animated.View style={[styles.partnerCTAContainer, { opacity: fadeAnim }]}>
      <View style={styles.partnerCTAContent}>
        <Text style={styles.partnerCTAText}>
          Partner with us to support legal education across Africa.
        </Text>
        <TouchableOpacity
          style={styles.partnerCTAButton}
          onPress={handlePartner}
          activeOpacity={0.8}
        >
          <Text style={styles.partnerCTAButtonText}>Partner With Us</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    marginBottom: 0,
  },
  contentContainer: {
    paddingTop: 0,
    maxWidth: '100%',
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    flexGrow: 1,
  },

  heroContainer: {
    width: '100%',
    maxWidth: '100%',
    minHeight: isMobile ? 550 : 700,
    overflow: 'hidden',
    marginTop: 0,
  },
  heroGradient: {
    flex: 1,
    minHeight: isMobile ? 550 : 700,
    position: 'relative',
  },
  particle: {
    position: 'absolute' as const,
    maxWidth: '100%',
  },
  particleDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.secondary,
    opacity: 0.6,
  },
  heroGlowContainer: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: 400,
    height: 400,
    marginLeft: -200,
    marginTop: -200,
  },
  heroGlow: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    backgroundColor: Colors.primary,
    opacity: 0.08,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 100,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    width: '100%',
    maxWidth: '100%',
    zIndex: 10,
  },
  heroHeadline: {
    fontSize: isMobile ? 34 : 56,
    fontWeight: '700' as const,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: isMobile ? 42 : 72,
    maxWidth: isMobile ? '95%' : 900,
    marginBottom: Spacing.xxxl,
    letterSpacing: -0.5,
    paddingHorizontal: isMobile ? Spacing.md : 0,
  },
  heroCTAContainer: {
    flexDirection: isMobile ? 'column' : 'row',
    gap: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: isMobile ? Spacing.lg : 0,
    marginBottom: 20,
  },
  ctaButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 8,
    minWidth: isMobile ? 260 : 200,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? '100%' : 'auto',
    maxWidth: 400,
  },
  ctaPrimary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaPrimaryText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  ctaSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  ctaSecondaryText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
  },

  whoWeAreContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: isMobile ? Spacing.xxxl : Spacing.xxxl * 1.5,
    paddingHorizontal: isMobile ? Spacing.lg : Spacing.xl,
    width: '100%',
    maxWidth: '100%',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: isMobile ? 28 : 40,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  whoWeAreText: {
    fontSize: isMobile ? 16 : 18,
    lineHeight: isMobile ? 26 : 32,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: isMobile ? Spacing.sm : 0,
  },

  coreAreasContainer: {
    paddingVertical: isMobile ? Spacing.xxxl : Spacing.xxxl * 1.5,
    paddingHorizontal: isMobile ? Spacing.lg : Spacing.xl,
    backgroundColor: Colors.white,
    width: '100%',
    maxWidth: '100%',
  },
  cardsGrid: {
    flexDirection: isMobile ? 'column' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: isMobile ? Spacing.lg : Spacing.xl,
    marginTop: Spacing.xxxl,
    width: '100%',
  },
  coreAreaCard: {
    width: isMobile ? '100%' : Math.min(340, (width - 120) / 3),
    maxWidth: isMobile ? '100%' : 380,
    minWidth: isMobile ? undefined : 300,
  },
  cardTouchable: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTopBorder: {
    height: 6,
    backgroundColor: Colors.primary,
  },
  cardContent: {
    padding: isMobile ? Spacing.lg : Spacing.xl,
  },
  cardTitle: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.md,
    textAlign: 'left',
  },
  cardDescription: {
    fontSize: isMobile ? 15 : 16,
    lineHeight: isMobile ? 24 : 26,
    color: '#444',
    textAlign: 'left',
  },

  impactStatsContainer: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  statsGradient: {
    paddingVertical: isMobile ? Spacing.xxxl : Spacing.xxxl * 1.5,
    paddingHorizontal: isMobile ? Spacing.lg : Spacing.xl,
  },
  statsGrid: {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isMobile ? Spacing.xxl : Spacing.xxxl,
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: isMobile ? Spacing.md : Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? '100%' : 'auto',
    minWidth: isMobile ? 0 : 200,
    maxWidth: isMobile ? '100%' : 300,
    paddingHorizontal: Spacing.md,
  },
  statValue: {
    fontSize: isMobile ? 38 : 56,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  statUnderline: {
    width: 60,
    height: 3,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.secondary,
    textAlign: 'center',
  },

  partnerCTAContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: isMobile ? Spacing.xxxl : Spacing.xxxl * 1.5,
    paddingHorizontal: isMobile ? Spacing.lg : Spacing.xl,
    width: '100%',
    maxWidth: '100%',
  },
  partnerCTAContent: {
    alignItems: 'center',
    maxWidth: 800,
    alignSelf: 'center',
  },
  partnerCTAText: {
    fontSize: isMobile ? 18 : 24,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: isMobile ? 28 : 36,
  },
  partnerCTAButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 8,
    minWidth: 220,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  partnerCTAButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
