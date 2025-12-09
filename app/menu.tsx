import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Colors, Spacing } from '@/constants/colors';

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Who We Are', href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Programs & Events', href: '/programs-events' },
  { label: 'Founder', href: '/founder' },
  { label: 'Contact', href: '/contact' },
];

export default function MenuPage() {
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href as any);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            accessibilityLabel="Close menu"
          >
            <X size={28} color={Colors.deepCharcoal} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {navLinks.map((link) => (
            <TouchableOpacity
              key={link.href}
              style={styles.menuItem}
              onPress={() => handleNavigate(link.href)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const fontWeight700 = '700' as const;
const fontWeight600 = '600' as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: fontWeight700,
    color: Colors.deepCharcoal,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: Spacing.xl,
  },
  menuItem: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: fontWeight600,
    color: Colors.deepCharcoal,
  },
});
