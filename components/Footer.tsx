import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { Linkedin, Instagram, Twitter } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function Footer() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const openEmail = () => {
    Linking.openURL('mailto:info@legallyyes.com');
  };

  return (
    <View style={styles.footerWrap}>
      <View style={styles.container}>
        <View style={styles.col}>
          <Text style={styles.brandName}>LegallyYes</Text>
          <Text style={styles.tagline}>
            Building the future of law through collaboration
          </Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>Contact Us</Text>
          <TouchableOpacity onPress={openEmail}>
            <Text style={styles.contactLine}>info@legallyyes.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('tel:+233256894465')}>
            <Text style={styles.contactLine}>Ghana: +233 256 894 465</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('tel:+2348149990849')}>
            <Text style={styles.contactLine}>Nigeria: +234 814 999 0849</Text>
          </TouchableOpacity>
          
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => openLink('https://linkedin.com/company/legallyyes')}
              accessibilityLabel="LinkedIn"
            >
              <Linkedin size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => openLink('https://instagram.com/legallyyes')}
              accessibilityLabel="Instagram"
            >
              <Instagram size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => openLink('https://twitter.com/legallyyes')}
              accessibilityLabel="Twitter"
            >
              <Twitter size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.col, styles.actionsCol]}>
          <TouchableOpacity style={styles.cta} onPress={openEmail}>
            <Text style={styles.ctaText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.copy}>
          © {new Date().getFullYear()} LegallyYes. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const fontWeight700 = '700' as const;

const styles = StyleSheet.create({
  footerWrap: {
    width: '100%',
    backgroundColor: '#071022',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 20,
    marginBottom: 0,
    marginTop: 0,
  },
  container: {
    maxWidth: 1100,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: isMobile ? 'column' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: isMobile ? 32 : 40,
  },
  col: {
    flex: isMobile ? 0 : 1,
    minWidth: isMobile ? '100%' : 180,
    maxWidth: isMobile ? '100%' : 320,
  },
  brandName: {
    fontSize: 26,
    fontWeight: fontWeight700,
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: '#dfeef6',
    lineHeight: 22,
    maxWidth: 300,
  },
  colTitle: {
    fontSize: 17,
    fontWeight: fontWeight700,
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  contactLine: {
    fontSize: 14,
    color: '#dfeef6',
    marginBottom: 10,
    lineHeight: 22,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  socialIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(253, 82, 0, 0.15)',
    borderWidth: 1,
    borderColor: '#FD5200',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsCol: {
    alignItems: isMobile ? 'flex-start' : 'flex-end',
  },
  cta: {
    backgroundColor: '#FD5200',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: isMobile ? '100%' : 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: fontWeight700,
    fontSize: 15,
    letterSpacing: 0.3,
  },
  secondaryCta: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FD5200',
  },
  secondaryCtaText: {
    color: '#FD5200',
  },
  bottom: {
    marginTop: 44,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  copy: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});
