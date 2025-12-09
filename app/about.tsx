import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Linking, Dimensions, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { Colors, Spacing, Layout } from '@/constants/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function AboutPage() {
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslateY = useRef(new Animated.Value(30)).current;
  const whoWeAreOpacity = useRef(new Animated.Value(0)).current;
  const whoWeAreTranslateY = useRef(new Animated.Value(40)).current;
  const missionOpacity = useRef(new Animated.Value(0)).current;
  const missionTranslateX = useRef(new Animated.Value(-50)).current;
  const visionOpacity = useRef(new Animated.Value(0)).current;
  const visionTranslateX = useRef(new Animated.Value(50)).current;
  const founderImageOpacity = useRef(new Animated.Value(0)).current;
  const founderImageTranslateX = useRef(new Animated.Value(-50)).current;
  const founderTextOpacity = useRef(new Animated.Value(0)).current;
  const founderTextTranslateX = useRef(new Animated.Value(50)).current;
  const outroOpacity = useRef(new Animated.Value(0)).current;
  const outroScale = useRef(new Animated.Value(0.9)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(heroTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(underlineWidth, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
      ]),
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(whoWeAreOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(whoWeAreTranslateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(missionOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(missionTranslateX, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(visionOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(visionTranslateX, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(founderImageOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(founderImageTranslateX, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(founderTextOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(founderTextTranslateX, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(outroOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(outroScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]);

    sequence.start();
  }, []);

  const handleContactRita = () => {
    Linking.openURL('mailto:info@legallyyes.com');
  };

  const handleExploreWork = () => {
    router.push('/what-we-do');
  };

  const underlineWidthInterpolated = underlineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Animated.View 
            style={[
              styles.heroSection,
              {
                opacity: heroOpacity,
                transform: [{ translateY: heroTranslateY }],
              },
            ]}
          >
            <Text style={styles.heroTitle}>About LegallyYes</Text>
            <Animated.View 
              style={[
                styles.heroUnderline,
                {
                  width: underlineWidthInterpolated,
                },
              ]}
            />
          </Animated.View>

          <Animated.View 
            style={[
              styles.whoWeAreSection,
              {
                opacity: whoWeAreOpacity,
                transform: [{ translateY: whoWeAreTranslateY }],
              },
            ]}
          >
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Who We Are</Text>
              <View style={styles.orangeAccentLine} />
            </View>
            <Text style={styles.sectionText}>
              Legally Yes is a professional legal-education organisation focused on equipping African lawyers with practical skills, technological competence, and strong professional networks. Through our training programs, events, and justice initiatives, we create opportunities for lawyers to learn, collaborate, and contribute to meaningful legal reform.
            </Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.missionSection,
              {
                opacity: missionOpacity,
                transform: [{ translateX: missionTranslateX }],
              },
            ]}
          >
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleDark}>Mission</Text>
            </View>
            <Text style={styles.sectionTextDark}>
              To build a future-ready generation of African lawyers through practical legal education, collaborative learning environments, and targeted justice interventions.
            </Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.visionSection,
              {
                opacity: visionOpacity,
                transform: [{ translateX: visionTranslateX }],
              },
            ]}
          >
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Vision</Text>
              <View style={styles.orangeAccentLine} />
            </View>
            <Text style={styles.sectionText}>
              An innovative and equitable legal ecosystem where young lawyers are empowered, informed, well-connected, and equipped to make meaningful impact.
            </Text>
          </Animated.View>

          <View style={styles.founderSection}>
            <View style={[styles.founderContainer, isDesktop && styles.founderContainerDesktop]}>
              <Animated.View 
                style={[
                  styles.founderImageContainer,
                  isDesktop && styles.founderImageContainerDesktop,
                  {
                    opacity: founderImageOpacity,
                    transform: [{ translateX: founderImageTranslateX }],
                  },
                ]}
              >
                <View style={styles.founderImageWrapper}>
                  <Image
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/0ve0dyccrox2eoil67p97' }}
                    style={styles.founderImage}
                    resizeMode="cover"
                  />
                </View>
              </Animated.View>

              <Animated.View 
                style={[
                  styles.founderTextContainer,
                  isDesktop && styles.founderTextContainerDesktop,
                  {
                    opacity: founderTextOpacity,
                    transform: [{ translateX: founderTextTranslateX }],
                  },
                ]}
              >
                <Text style={styles.founderName}>Rita S.A. Oruche</Text>
                <Text style={styles.founderTitle}>Principal Attorney, Bridgegold Legal</Text>
                <Text style={styles.founderTitle}>Vice Chairman, NBA-SLP Technology, Media & Telecommunications Subcommittee</Text>
                <Text style={styles.founderBio}>
                  Rita S.A. Oruche is a distinguished legal professional with extensive experience across corporate, commercial, and land-related matters. She has advised individuals, startups, and corporations, helping clients navigate complex legal issues with clarity and confidence. Her commitment to excellence, innovation, and impact is reflected in her work and in the vision behind LegallyYes.
                </Text>
                <TouchableOpacity style={styles.founderCTA} onPress={handleContactRita}>
                  <Text style={styles.founderCTAText}>Contact Rita</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          <Animated.View 
            style={[
              styles.outroSection,
              {
                opacity: outroOpacity,
                transform: [{ scale: outroScale }],
              },
            ]}
          >
            <Text style={styles.outroText}>
              Discover what we do and how we shape the future of legal practice.
            </Text>
            <TouchableOpacity style={styles.outroButton} onPress={handleExploreWork}>
              <Text style={styles.outroButtonText}>Explore Our Work</Text>
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
    paddingTop: isDesktop ? Layout.headerHeight.desktop : Layout.headerHeight.mobile,
    maxWidth: '100%',
    paddingBottom: 0,
    marginBottom: 0,
    flexGrow: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: isDesktop ? Spacing.xl * 2 : Spacing.xxxl,
    paddingHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
    width: '100%',
    maxWidth: '100%',
  },
  heroTitle: {
    fontSize: isDesktop ? 56 : 34,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  heroUnderline: {
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    marginTop: Spacing.sm,
  },
  whoWeAreSection: {
    backgroundColor: Colors.iceBlue,
    paddingVertical: isDesktop ? Spacing.xl * 2 : Spacing.xxl,
    paddingHorizontal: isDesktop ? Spacing.xl * 2 : Spacing.lg,
    marginHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
    marginVertical: Spacing.xl,
    borderRadius: isDesktop ? 20 : 16,
    maxWidth: '100%',
  },
  sectionTitleContainer: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: isDesktop ? 40 : 26,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.sm,
  },
  sectionTitleDark: {
    fontSize: isDesktop ? 40 : 26,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.sm,
  },
  orangeAccentLine: {
    width: 80,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  sectionText: {
    fontSize: isDesktop ? 18 : 15,
    lineHeight: isDesktop ? 32 : 24,
    color: Colors.deepCharcoal,
  },
  sectionTextDark: {
    fontSize: isDesktop ? 18 : 15,
    lineHeight: isDesktop ? 32 : 24,
    color: Colors.deepCharcoal,
  },
  missionSection: {
    backgroundColor: Colors.white,
    paddingVertical: isDesktop ? Spacing.xl * 2 : Spacing.xxl,
    paddingHorizontal: isDesktop ? Spacing.xl * 2 : Spacing.lg,
    marginHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
    marginVertical: Spacing.xl,
    borderTopWidth: isDesktop ? 6 : 4,
    borderTopColor: Colors.primary,
    borderRadius: 12,
    shadowColor: Colors.deepCharcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    maxWidth: '100%',
  },
  visionSection: {
    backgroundColor: Colors.softGray,
    paddingVertical: isDesktop ? Spacing.xl * 2 : Spacing.xxl,
    paddingHorizontal: isDesktop ? Spacing.xl * 2 : Spacing.lg,
    marginHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
    marginVertical: Spacing.xl,
    borderRadius: 12,
    shadowColor: Colors.deepCharcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    maxWidth: '100%',
  },
  founderSection: {
    backgroundColor: Colors.white,
    paddingVertical: isDesktop ? Spacing.xl * 3 : Spacing.xxxl,
    paddingHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
    marginVertical: isDesktop ? Spacing.xl * 2 : Spacing.xl,
    width: '100%',
    maxWidth: '100%',
  },
  founderContainer: {
    flexDirection: 'column',
    gap: isDesktop ? Spacing.xl : Spacing.lg,
    width: '100%',
  },
  founderContainerDesktop: {
    flexDirection: 'row',
    gap: Spacing.xl * 2,
    maxWidth: 1200,
    marginHorizontal: 'auto' as any,
  },
  founderImageContainer: {
    flex: 1,
  },
  founderImageContainerDesktop: {
    flex: 1,
  },
  founderImageWrapper: {
    width: '100%',
    maxWidth: isDesktop ? '100%' : 400,
    alignSelf: 'center',
    aspectRatio: 0.8,
    borderRadius: isDesktop ? 16 : 14,
    overflow: 'hidden',
    borderWidth: isDesktop ? 12 : 10,
    borderColor: '#f6f0ec',
    shadowColor: Colors.deepCharcoal,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  founderImage: {
    width: '100%',
    height: '100%',
  },
  founderTextContainer: {
    flex: 1,
    borderLeftWidth: 0,
    borderLeftColor: Colors.primary,
    paddingLeft: 0,
  },
  founderTextContainerDesktop: {
    flex: 1,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    paddingLeft: Spacing.xl * 2,
  },
  founderName: {
    fontSize: isDesktop ? 36 : 26,
    fontWeight: '700' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.sm,
  },
  founderTitle: {
    fontSize: isDesktop ? 16 : 13,
    color: Colors.primary,
    marginBottom: Spacing.xs,
    fontWeight: '600' as const,
    lineHeight: isDesktop ? 22 : 20,
  },
  founderBio: {
    fontSize: isDesktop ? 17 : 14,
    lineHeight: isDesktop ? 30 : 22,
    color: Colors.deepCharcoal,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  founderCTA: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 30,
    alignSelf: isDesktop ? 'flex-start' : 'center',
    minHeight: 44,
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  founderCTAText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.white,
    fontFamily: 'Inter',
  },
  outroSection: {
    backgroundColor: Colors.iceBlue,
    paddingVertical: isDesktop ? Spacing.xl * 2 : Spacing.xxxl,
    paddingHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
    marginVertical: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
  },
  outroText: {
    fontSize: isDesktop ? 20 : 15,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: isDesktop ? 32 : 24,
  },
  outroButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl * 1.5,
    borderRadius: 30,
    minHeight: 44,
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  outroButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.white,
  },
});
