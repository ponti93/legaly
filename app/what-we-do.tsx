import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors, Spacing, Layout } from '@/constants/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Users, Scale } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

interface PillarCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  borderColor: string;
  borderPosition: 'top' | 'left';
  delay: number;
}

function PillarCard({
  title,
  description,
  icon,
  backgroundColor,
  borderColor,
  borderPosition,
  delay,
}: PillarCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);



  const borderStyle =
    borderPosition === 'top'
      ? { borderTopWidth: 4, borderTopColor: borderColor }
      : { borderLeftWidth: 4, borderLeftColor: borderColor };

  return (
    <TouchableOpacity activeOpacity={0.95}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor,
            opacity: fadeAnim,
            transform: [{ translateY }, { scale: scaleAnim }],
          },
          borderStyle,
        ]}
      >
        <View style={styles.cardIconContainer}>{icon}</View>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.titleUnderline} />
        <Text style={styles.cardDescription}>{description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

function FloatingShape({
  color,
  size,
  top,
  left,
  delay,
}: {
  color: string;
  size: number;
  top: number;
  left: number;
  delay: number;
}) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000 + delay,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000 + delay,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <Animated.View
      style={[
        styles.floatingShape,
        {
          backgroundColor: color,
          width: size,
          height: size,
          top,
          left,
          transform: [{ translateY }],
        },
      ]}
    />
  );
}

export default function WhatWeDoPage() {
  const router = useRouter();
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(-20)).current;
  const introFadeAnim = useRef(new Animated.Value(0)).current;
  const ctaFadeAnim = useRef(new Animated.Value(0)).current;
  const ctaScaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleFadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(introFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(ctaFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(ctaScaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  }, []);

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
          <FloatingShape
            color={Colors.primary}
            size={80}
            top={100}
            left={20}
            delay={0}
          />
          <FloatingShape
            color={Colors.secondary}
            size={120}
            top={300}
            left={width - 140}
            delay={500}
          />
          <FloatingShape
            color={Colors.primary}
            size={60}
            top={550}
            left={30}
            delay={1000}
          />

          <View style={styles.titleBlock}>
            <Animated.View
              style={{
                opacity: titleFadeAnim,
                transform: [{ translateY: titleTranslateY }],
              }}
            >
              <Text style={styles.pageTitle}>What We Do</Text>
              <View style={styles.titleUnderlineContainer}>
                <View style={styles.titleUnderlineShimmer} />
              </View>
            </Animated.View>
          </View>

          <Animated.View
            style={[styles.introContainer, { opacity: introFadeAnim }]}
          >
            <Text style={styles.introText}>
              At LegallyYes, our work is centered on empowering the next
              generation of African lawyers through education, connection, and
              justice-driven impact. We achieve this through three core pillars.
            </Text>
          </Animated.View>

          <View style={styles.pillarsSection}>
            <View style={styles.pillarsGrid}>
              <PillarCard
                title="Education & Training"
                description="Structured, practical, and technology-integrated legal training designed to equip lawyers with the skills needed for modern legal practice."
                icon={<BookOpen size={48} color={Colors.primary} />}
                backgroundColor={Colors.white}
                borderColor={Colors.primary}
                borderPosition="top"
                delay={200}
              />
              <PillarCard
                title="Events & Networking"
                description="We create dynamic professional communities through curated events, workshops, and forums that promote collaboration, mentorship, and industry connection."
                icon={<Users size={48} color={Colors.primary} />}
                backgroundColor={Colors.secondary}
                borderColor={Colors.primary}
                borderPosition="top"
                delay={400}
              />
              <PillarCard
                title="Justice Initiative"
                description="Our justice initiative supports individuals affected by unlawful detention, delayed cases, and legal neglect — reflecting our commitment to fairness, equity, and social impact."
                icon={<Scale size={48} color={Colors.primary} />}
                backgroundColor={Colors.white}
                borderColor={Colors.primary}
                borderPosition="left"
                delay={600}
              />
            </View>
          </View>

          <Animated.View
            style={[
              styles.ctaBlock,
              {
                opacity: ctaFadeAnim,
                transform: [{ scale: ctaScaleAnim }],
              },
            ]}
          >
            <Text style={styles.ctaText}>
              Discover our flagship programs and upcoming events designed to
              support and empower lawyers across Africa.
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.push('/programs-events')}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaButtonText}>
                Explore Programs & Events
              </Text>
            </TouchableOpacity>
          </Animated.View>

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
    paddingTop: 10,
    paddingBottom: 0,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    marginBottom: 0,
  },
  contentContainer: {
    paddingTop: isMobile ? Layout.headerHeight.mobile : Layout.headerHeight.desktop,
    maxWidth: '100%',
    paddingBottom: 0,
    marginBottom: 0,
    flexGrow: 1,
  },
  floatingShape: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.08,
  },
  titleBlock: {
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    maxWidth: '100%',
  },
  pageTitle: {
    fontSize: isMobile ? 34 : 48,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  titleUnderlineContainer: {
    width: 120,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  titleUnderlineShimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  introContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  introText: {
    fontSize: isMobile ? 16 : 18,
    lineHeight: isMobile ? 26 : 30,
    color: Colors.deepCharcoal,
    textAlign: 'center',
  },
  pillarsSection: {
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    maxWidth: '100%',
    width: '100%',
  },
  pillarsGrid: {
    flexDirection: isMobile ? 'column' : 'row',
    gap: Spacing.xxl,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  card: {
    flex: isMobile ? 0 : 1,
    width: isMobile ? '100%' : undefined,
    maxWidth: isMobile ? '100%' : 360,
    padding: isMobile ? Spacing.lg : Spacing.xxl,
    borderRadius: 16,
    shadowColor: Colors.deepCharcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardIconContainer: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.md,
    textAlign: 'left',
  },
  titleUnderline: {
    width: 40,
    height: 2,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.lg,
  },
  cardDescription: {
    fontSize: isMobile ? 14 : 15,
    lineHeight: isMobile ? 22 : 24,
    color: Colors.deepCharcoal,
    opacity: 0.85,
    textAlign: 'left',
  },

  ctaBlock: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    marginBottom: 0,
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
  },
  ctaText: {
    fontSize: isMobile ? 16 : 18,
    lineHeight: isMobile ? 26 : 30,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    maxWidth: 700,
    marginBottom: Spacing.xxl,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxxl,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
    textAlign: 'center',
  },
});
