import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '@/constants/colors';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  const particles = useRef(
    Array.from({ length: 8 }).map(() => {
      const xPosition = Math.random() * width;
      const yAnim = new Animated.Value(Math.random() * 800);
      return {
        x: xPosition,
        y: yAnim,
        scale: Math.random() * 0.2 + 0.3,
        duration: (Math.random() * 8 + 12) * 1000,
      };
    })
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: 0.15,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.08,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

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
              toValue: 850,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      animateParticle();
    });

    setTimeout(() => {
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 500);

    setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2000);
  }, [logoOpacity, logoScale, taglineOpacity, glowOpacity, fadeOut, onFinish, particles]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <LinearGradient
        colors={[Colors.deepCharcoal, '#1a1f2e', Colors.deepCharcoal]}
        style={styles.gradient}
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

        <Animated.View
          style={[
            styles.glowContainer,
            {
              opacity: glowOpacity,
            },
          ]}
        >
          <View style={styles.orangeGlow} />
        </Animated.View>

        <View style={styles.contentContainer}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <Image
              source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/dghaiwzfh3hlv793j97uo' }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View style={[styles.taglineContainer, { opacity: taglineOpacity }]}>
            <Text style={styles.tagline}>
              Building the future of law through collaboration
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.deepCharcoal,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  particle: {
    position: 'absolute',
  },
  particleDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.iceBlue,
    opacity: 0.4,
  },
  glowContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeGlow: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 15,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: Spacing.xxl,
  },
  logoImage: {
    width: 180,
    height: 180,
  },
  taglineContainer: {
    maxWidth: 450,
  },
  tagline: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.3,
    opacity: 0.95,
  },
});
