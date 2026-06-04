import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProfile } from "@/context/ProfileContext";
import { useColors } from "@/hooks/useColors";

const MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function ArchiveScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { savedProfiles, deleteProfile, loadProfile } = useProfile();

  const handleLoad = (saved: (typeof savedProfiles)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    loadProfile(saved);
    router.push("/(tabs)/reading");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Remove Profile", "Remove this profile from your archive?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        await deleteProfile(id);
      }},
    ]);
  };

  if (savedProfiles.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.background, paddingTop: insets.top + (Platform.OS === "web" ? 67 : 16) }]}>
        <LinearGradient colors={["#9b51ec11","#d4af3711"]} style={styles.emptyOrb} />
        <Feather name="archive" size={48} color={colors.border} />
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Archivum of Souls</Text>
        <Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>
          Your saved profiles appear here. Calculate a reading and tap Save to begin your archive.
        </Text>
        <Pressable onPress={() => router.push("/(tabs)/index")} style={({ pressed }) => [styles.emptyBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
          <Feather name="compass" size={16} color="#fff" />
          <Text style={styles.emptyBtnText}>Start a Reading</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[styles.container, { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 20), paddingBottom: insets.bottom + 120 }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.pageTitle, { color: colors.foreground }]}>Archivum of Souls</Text>
      <Text style={[styles.pageSub, { color: colors.mutedForeground }]}>{savedProfiles.length} saved {savedProfiles.length === 1 ? "profile" : "profiles"}</Text>

      {savedProfiles.map(saved => {
        const { input, numerology, astrology } = saved.profile;
        const d = new Date(saved.savedAt);
        const savedLabel = `${d.getDate()} ${MN[d.getMonth()]} ${d.getFullYear()}`;
        return (
          <View key={saved.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <LinearGradient colors={["#9b51ec14","transparent"]} style={StyleSheet.absoluteFill} />
            <View style={styles.cardTop}>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={[styles.cardName, { color: colors.foreground }]} numberOfLines={1}>{input.name}</Text>
                <Text style={[styles.cardDate, { color: colors.mutedForeground }]}>
                  {input.day} {MN[input.month - 1]} {input.year} · {input.gender}
                </Text>
                <Text style={[styles.cardSaved, { color: colors.mutedForeground }]}>Saved {savedLabel}</Text>
              </View>
              <Pressable onPress={() => handleDelete(saved.id)} style={{ padding: 4 }}>
                <Feather name="trash-2" size={17} color={colors.destructive} />
              </Pressable>
            </View>
            <View style={styles.pills}>
              {[
                { label: "Psyche", value: String(numerology.psycheNum), color: colors.gold },
                { label: "Destiny", value: String(numerology.destinyNum), color: colors.gold },
                { label: "Kua", value: String(numerology.kuaNum), color: "#a78bfa" },
                { label: "Sign", value: astrology.western_sign.slice(0, 3), color: "#7c3aed" },
                { label: "Animal", value: astrology.sign.slice(0, 3), color: "#06b6d4" },
              ].map(p => (
                <View key={p.label} style={[styles.pill, { backgroundColor: colors.muted }]}>
                  <Text style={[styles.pillLabel, { color: colors.mutedForeground }]}>{p.label}</Text>
                  <Text style={[styles.pillValue, { color: p.color }]}>{p.value}</Text>
                </View>
              ))}
            </View>
            <Pressable onPress={() => handleLoad(saved)} style={({ pressed }) => [styles.loadBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}>
              <Feather name="book-open" size={15} color="#fff" />
              <Text style={styles.loadBtnText}>Open Full Reading</Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, gap: 14 },
  pageTitle: { fontSize: 22, fontFamily: "Inter_700Bold", marginBottom: 2 },
  pageSub: { fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 4 },
  card: { borderRadius: 16, borderWidth: 1, padding: 18, gap: 14, overflow: "hidden" },
  cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  cardName: { fontSize: 17, fontFamily: "Inter_700Bold" },
  cardDate: { fontSize: 12, fontFamily: "Inter_400Regular" },
  cardSaved: { fontSize: 11, fontFamily: "Inter_400Regular" },
  pills: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  pill: { borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, alignItems: "center", gap: 2 },
  pillLabel: { fontSize: 9, fontFamily: "Inter_500Medium", letterSpacing: 0.5 },
  pillValue: { fontSize: 14, fontFamily: "Inter_700Bold" },
  loadBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 10, paddingVertical: 12 },
  loadBtnText: { color: "#fff", fontSize: 14, fontFamily: "Inter_600SemiBold" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 16 },
  emptyOrb: { position: "absolute", width: 300, height: 300, borderRadius: 150 },
  emptyTitle: { fontSize: 20, fontFamily: "Inter_700Bold", textAlign: "center" },
  emptyBody: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
  emptyBtn: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24 },
  emptyBtnText: { color: "#fff", fontSize: 15, fontFamily: "Inter_600SemiBold" },
});
