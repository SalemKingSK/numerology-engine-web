import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";

interface ReadingCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  body: string;
  extraContent?: React.ReactNode;
  accentColor?: string;
  defaultExpanded?: boolean;
}

export function ReadingCard({
  title,
  subtitle,
  badge,
  badgeColor,
  body,
  extraContent,
  accentColor,
  defaultExpanded = false,
}: ReadingCardProps) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const rotation = React.useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const accent = accentColor ?? colors.primary;

  const toggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const toValue = expanded ? 0 : 1;
    setExpanded((prev) => !prev);
    Animated.timing(rotation, {
      toValue,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const handleSpeak = async () => {
    if (speaking) {
      await Speech.stop();
      setSpeaking(false);
      return;
    }
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const fullText = `${title}. ${body}`;
      setSpeaking(true);
      setLoading(false);
      await Speech.speak(fullText, {
        language: "en-US",
        pitch: 0.9,
        rate: Platform.OS === "ios" ? 0.48 : 0.85,
        onDone: () => setSpeaking(false),
        onStopped: () => setSpeaking(false),
        onError: () => { setSpeaking(false); setLoading(false); },
      });
    } catch {
      setSpeaking(false);
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: expanded ? accent : colors.border,
          borderLeftColor: accent,
        },
      ]}
    >
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.header,
          pressed && styles.headerPressed,
        ]}
      >
        <View style={styles.headerLeft}>
          {badge ? (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: badgeColor
                    ? `${badgeColor}22`
                    : `${accent}22`,
                  borderColor: badgeColor ?? accent,
                },
              ]}
            >
              <Text
                style={[styles.badgeText, { color: badgeColor ?? accent }]}
              >
                {badge}
              </Text>
            </View>
          ) : null}
          <Text style={[styles.title, { color: colors.foreground }]}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
        </Animated.View>
      </Pressable>

      {expanded ? (
        <View style={styles.body}>
          <View
            style={[styles.divider, { backgroundColor: accent, opacity: 0.4 }]}
          />
          <View style={styles.speakRow}>
            <Pressable
              onPress={handleSpeak}
              style={({ pressed }) => [
                styles.speakBtn,
                {
                  backgroundColor: speaking
                    ? `${accent}33`
                    : `${colors.muted}`,
                  borderColor: speaking ? accent : colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color={accent} />
              ) : (
                <Feather
                  name={speaking ? "volume-x" : "volume-2"}
                  size={14}
                  color={speaking ? accent : colors.mutedForeground}
                />
              )}
              <Text
                style={[
                  styles.speakText,
                  { color: speaking ? accent : colors.mutedForeground },
                ]}
              >
                {speaking ? "Stop" : "Read Aloud"}
              </Text>
            </Pressable>
          </View>

          <ScrollView
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.bodyText, { color: colors.foreground }]}>
              {body}
            </Text>
          </ScrollView>

          {extraContent ? (
            <View style={styles.extraContainer}>{extraContent}</View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  headerPressed: {
    opacity: 0.75,
  },
  headerLeft: {
    flex: 1,
    gap: 4,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  body: {
    paddingBottom: 16,
  },
  speakRow: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  speakBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  speakText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  extraContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
