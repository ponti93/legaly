import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  logoSrc?: any;
  siteName?: string;
};

export default function Header({ logoSrc, siteName = "LegallyYes" }: Props) {
  const router = useRouter();

  function goTo(path: string) {
    router.push(path as any);
  }

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <TouchableOpacity
          accessible
          accessibilityLabel="Home"
          onPress={() => goTo("/")}
          style={styles.logoBtn}
        >
          {logoSrc ? (
            <Image source={logoSrc} style={styles.logo} resizeMode="contain" />
          ) : (
            <Text style={styles.siteName}>{siteName}</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.right}>
        <TouchableOpacity
          accessible
          accessibilityLabel="Menu"
          onPress={() => goTo("/menu")}
          style={styles.menuBtn}
        >
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    zIndex: 9999,
  },
  left: { flexDirection: "row", alignItems: "center" },
  right: { flexDirection: "row", alignItems: "center" },
  logoBtn: { paddingVertical: 6, paddingHorizontal: 6 },
  logo: { width: 110, height: 44 },
  siteName: { fontSize: 20, fontWeight: "700", color: "#0f1724" },
  menuBtn: { padding: 10 },
  hamburger: { fontSize: 22, color: "#0f1724" },
});
