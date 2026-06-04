import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useMemo, useCallback } from "react";
import {
  KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useProfile } from "@/context/ProfileContext";
import { useColors } from "@/hooks/useColors";
import { famousBirthdays } from "@/lib/famous-birthdays";
import { fetchWikipediaBiography } from "@/lib/ai-service";
import type { AstroInsightInput, FamousPerson } from "@/lib/types";

const GENDER_OPTIONS = ["male", "female", "other", "unknown"] as const;
type Gender = (typeof GENDER_OPTIONS)[number];

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function searchPeople(query: string): FamousPerson[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const matched = famousBirthdays.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
  );
  matched.sort((a, b) => {
    const an = a.name.toLowerCase(), bn = b.name.toLowerCase();
    const ar = an === q ? 0 : an.startsWith(q) ? 1 : an.includes(q) ? 2 : 3;
    const br = bn === q ? 0 : bn.startsWith(q) ? 1 : bn.includes(q) ? 2 : 3;
    return ar - br;
  });
  return matched.slice(0, 20);
}

export default function CalculateScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { calculate } = useProfile();

  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [searchModal, setSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wikiLoading, setWikiLoading] = useState(false);

  const searchResults = useMemo(() => searchPeople(searchQuery), [searchQuery]);

  const applyPerson = useCallback((p: FamousPerson) => {
    setName(p.name);
    setBirthDay(String(p.day));
    setBirthMonth(String(p.month));
    setBirthYear(String(p.year));
    setGender(p.gender === "other" ? "other" : p.gender);
    setErrors({});
    setSearchModal(false);
    setSearchQuery("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const handleWikipediaSearch = useCallback(async () => {
    if (!name.trim()) {
      setErrors(e => ({ ...e, name: "Enter a name to search Wikipedia" }));
      return;
    }
    setWikiLoading(true);
    try {
      const result = await fetchWikipediaBiography(name.trim());
      if (result?.day) setBirthDay(String(result.day));
      if (result?.month) setBirthMonth(String(result.month));
      if (result?.year) setBirthYear(String(result.year));
      if (result?.gender) setGender((result.gender as Gender) || "unknown");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setErrors(e => ({ ...e, name: "Wikipedia search failed" }));
    } finally {
      setWikiLoading(false);
    }
  }, [name]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    const d = parseInt(birthDay, 10);
    const m = parseInt(birthMonth, 10);
    const y = parseInt(birthYear, 10);
    if (!birthDay || isNaN(d) || d < 1 || d > 31) errs.day = "Enter day 1–31";
    if (!birthMonth || isNaN(m) || m < 1 || m > 12) errs.month = "Enter month 1–12";
    if (!birthYear || isNaN(y) || y < 1800 || y > 2099) errs.year = "Enter a valid birth year";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const input: AstroInsightInput = {
      name: name.trim(),
      day: parseInt(birthDay, 10),
      month: parseInt(birthMonth, 10),
      year: parseInt(birthYear, 10),
      gender,
    };
    calculate(input);
    router.push("/(tabs)/reading");
  };

  const monthLabel = birthMonth && !isNaN(parseInt(birthMonth)) && parseInt(birthMonth) >= 1 && parseInt(birthMonth) <= 12
    ? MONTH_NAMES[parseInt(birthMonth) - 1] : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 20), paddingBottom: insets.bottom + 120 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <LinearGradient colors={["#9b51ec22", "#d4af3722"]} style={styles.glowOrb} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>MYSTIQUE</Text>
          <Text style={[styles.heroSubtitle, { color: colors.gold }]}>COMPASS</Text>
          <Text style={[styles.heroTagline, { color: colors.mutedForeground }]}>Reveal the numbers of your destiny</Text>
        </View>

        {/* Famous Birthdays Button */}
        <Pressable onPress={() => setSearchModal(true)} style={({ pressed }) => [styles.famousBtn, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 }]}>
          <Feather name="star" size={16} color={colors.gold} />
          <Text style={[styles.famousBtnText, { color: colors.foreground }]}>Search Famous Birthdays</Text>
          <Text style={[styles.famousCount, { color: colors.mutedForeground }]}>{famousBirthdays.length}+</Text>
        </Pressable>

        {/* Form Card */}
        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionLabel, { color: colors.gold }]}>YOUR PROFILE</Text>

          {/* Name + Wikipedia */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Full Name</Text>
            <View style={styles.nameRow}>
              <TextInput
                style={[styles.input, styles.flex1, { backgroundColor: colors.muted, borderColor: errors.name ? colors.destructive : colors.border, color: colors.foreground }]}
                value={name}
                onChangeText={t => { setName(t); setErrors(e => ({ ...e, name: "" })); }}
                placeholder="Enter full name"
                placeholderTextColor={colors.mutedForeground}
                autoCapitalize="words"
              />
              <Pressable onPress={handleWikipediaSearch} style={[styles.wikiBtn, { backgroundColor: colors.muted, borderColor: colors.border }]} disabled={wikiLoading}>
                {wikiLoading
                  ? <ActivityIndicator size="small" color={colors.primary} />
                  : <Text style={[styles.wikiBtnText, { color: colors.primary }]}>Wiki</Text>
                }
              </Pressable>
            </View>
            {errors.name ? <Text style={[styles.errorText, { color: colors.destructive }]}>{errors.name}</Text> : null}
          </View>

          {/* Gender */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Gender</Text>
            <View style={styles.genderRow}>
              {GENDER_OPTIONS.map(g => (
                <Pressable
                  key={g}
                  onPress={() => { setGender(g); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                  style={[styles.genderChip, {
                    backgroundColor: gender === g ? colors.primary : colors.muted,
                    borderColor: gender === g ? colors.primary : colors.border,
                  }]}
                >
                  <Text style={[styles.genderChipText, { color: gender === g ? "#fff" : colors.mutedForeground }]}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Date of Birth */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Date of Birth</Text>
            <View style={styles.dateRow}>
              <View style={[styles.dateField, { flex: 1 }]}>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.muted, borderColor: errors.day ? colors.destructive : colors.border, color: colors.foreground, textAlign: "center" }]}
                  value={birthDay} onChangeText={t => { setBirthDay(t); setErrors(e => ({ ...e, day: "" })); }}
                  placeholder="DD" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" maxLength={2}
                />
                <Text style={[styles.dateHint, { color: colors.mutedForeground }]}>Day</Text>
                {errors.day ? <Text style={[styles.errorText, { color: colors.destructive }]}>{errors.day}</Text> : null}
              </View>
              <View style={[styles.dateField, { flex: 1.4 }]}>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.muted, borderColor: errors.month ? colors.destructive : colors.border, color: colors.foreground, textAlign: "center" }]}
                  value={birthMonth} onChangeText={t => { setBirthMonth(t); setErrors(e => ({ ...e, month: "" })); }}
                  placeholder="MM" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" maxLength={2}
                />
                <Text style={[styles.dateHint, { color: colors.mutedForeground }]}>{monthLabel ?? "Month"}</Text>
                {errors.month ? <Text style={[styles.errorText, { color: colors.destructive }]}>{errors.month}</Text> : null}
              </View>
              <View style={[styles.dateField, { flex: 1.6 }]}>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.muted, borderColor: errors.year ? colors.destructive : colors.border, color: colors.foreground, textAlign: "center" }]}
                  value={birthYear} onChangeText={t => { setBirthYear(t); setErrors(e => ({ ...e, year: "" })); }}
                  placeholder="YYYY" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" maxLength={4}
                />
                <Text style={[styles.dateHint, { color: colors.mutedForeground }]}>Year</Text>
                {errors.year ? <Text style={[styles.errorText, { color: colors.destructive }]}>{errors.year}</Text> : null}
              </View>
            </View>
          </View>
        </View>

        {/* Calculate Button */}
        <Pressable onPress={handleCalculate} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
          <LinearGradient colors={["#7c3aed", "#9b51ec", "#d4af3760"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.calcButton}>
            <Feather name="compass" size={18} color="#fff" />
            <Text style={styles.calcButtonText}>Reveal My Numbers</Text>
          </LinearGradient>
        </Pressable>

        <Text style={[styles.footerNote, { color: colors.mutedForeground }]}>
          Based on Cheiro's Chaldean Numerology · Alexandrov's Psychomatrix · Chinese & Western Astrology
        </Text>
      </ScrollView>

      {/* Famous Birthdays Modal */}
      <Modal visible={searchModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSearchModal(false)}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Famous Birthdays</Text>
            <Pressable onPress={() => { setSearchModal(false); setSearchQuery(""); }}>
              <Feather name="x" size={22} color={colors.mutedForeground} />
            </Pressable>
          </View>
          <View style={[styles.searchBox, { backgroundColor: colors.muted, borderColor: colors.border }]}>
            <Feather name="search" size={16} color={colors.mutedForeground} />
            <TextInput
              style={[styles.searchInput, { color: colors.foreground }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search people, places, tags…"
              placeholderTextColor={colors.mutedForeground}
              autoFocus
              autoCapitalize="none"
            />
            {searchQuery ? (
              <Pressable onPress={() => setSearchQuery("")}>
                <Feather name="x-circle" size={16} color={colors.mutedForeground} />
              </Pressable>
            ) : null}
          </View>
          <FlatList
            data={searchResults}
            keyExtractor={(item, i) => `${item.name}-${i}`}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => applyPerson(item)} style={[styles.resultItem, { borderBottomColor: colors.border }]}>
                <View style={styles.resultMain}>
                  <Text style={[styles.resultName, { color: colors.foreground }]}>{item.name}</Text>
                  <Text style={[styles.resultDate, { color: colors.mutedForeground }]}>
                    {item.day}/{item.month}/{item.year} · {item.gender}
                  </Text>
                </View>
                <View style={styles.resultTags}>
                  {item.tags.slice(0, 2).map(t => (
                    <View key={t} style={[styles.tag, { backgroundColor: colors.muted }]}>
                      <Text style={[styles.tagText, { color: colors.mutedForeground }]}>{t}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchQuery.length > 1 ? (
                <Text style={[styles.emptySearch, { color: colors.mutedForeground }]}>No results for "{searchQuery}"</Text>
              ) : (
                <Text style={[styles.emptySearch, { color: colors.mutedForeground }]}>Type to search {famousBirthdays.length}+ profiles…</Text>
              )
            }
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, gap: 16 },
  heroSection: { alignItems: "center", paddingVertical: 20, position: "relative" },
  glowOrb: { position: "absolute", width: 240, height: 240, borderRadius: 120, top: -40, opacity: 0.5 },
  heroTitle: { fontSize: 32, fontFamily: "Inter_700Bold", letterSpacing: 8, textAlign: "center" },
  heroSubtitle: { fontSize: 16, fontFamily: "Inter_400Regular", letterSpacing: 12, textAlign: "center", marginTop: 2 },
  heroTagline: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 10, letterSpacing: 0.4 },
  famousBtn: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 12, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 16 },
  famousBtnText: { flex: 1, fontSize: 14, fontFamily: "Inter_500Medium" },
  famousCount: { fontSize: 12, fontFamily: "Inter_400Regular" },
  formCard: { borderRadius: 16, borderWidth: 1, padding: 20, gap: 16 },
  sectionLabel: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 12, fontFamily: "Inter_500Medium", letterSpacing: 0.5 },
  nameRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  flex1: { flex: 1 },
  input: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, fontFamily: "Inter_400Regular" },
  wikiBtn: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 12, alignItems: "center", justifyContent: "center", minWidth: 52 },
  wikiBtnText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  genderRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  genderChip: { borderRadius: 20, borderWidth: 1, paddingVertical: 7, paddingHorizontal: 14 },
  genderChipText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  dateRow: { flexDirection: "row", gap: 8 },
  dateField: { gap: 4 },
  dateHint: { fontSize: 10, fontFamily: "Inter_400Regular", textAlign: "center", letterSpacing: 0.3 },
  errorText: { fontSize: 11, fontFamily: "Inter_400Regular" },
  calcButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 24 },
  calcButtonText: { color: "#fff", fontSize: 16, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5 },
  footerNote: { fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center", letterSpacing: 0.3, paddingBottom: 8 },
  // Modal
  modalContainer: { flex: 1 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  modalTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginVertical: 12, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  searchInput: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular" },
  resultItem: { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  resultMain: { gap: 2 },
  resultName: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  resultDate: { fontSize: 12, fontFamily: "Inter_400Regular" },
  resultTags: { flexDirection: "row", gap: 6, marginTop: 6, flexWrap: "wrap" },
  tag: { borderRadius: 6, paddingVertical: 2, paddingHorizontal: 8 },
  tagText: { fontSize: 11, fontFamily: "Inter_400Regular" },
  emptySearch: { padding: 32, textAlign: "center", fontFamily: "Inter_400Regular", fontSize: 14 },
});
