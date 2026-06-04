import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface NumberCardProps {
  number: number;
  label: string;
  sublabel?: string;
  variant?: "primary" | "gold" | "muted";
  size?: "small" | "large";
}

export function NumberCard({
  number,
  label,
  sublabel,
  variant = "primary",
  size = "large",
}: NumberCardProps) {
  const colors = useColors();

  const gradientColors: [string, string] =
    variant === "gold"
      ? [colors.goldDim, colors.gold]
      : variant === "muted"
        ? [colors.muted, colors.accent]
        : [colors.purpleMid, colors.primary];

  const circleSize = size === "large" ? 88 : 60;
  const numFontSize = size === "large" ? 36 : 24;
  const isMaster = number === 11 || number === 22 || number === 33;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            borderColor: variant === "gold" ? colors.gold : colors.primary,
          },
        ]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      >
        <Text
          style={[
            styles.number,
            {
              fontSize: numFontSize,
              color:
                variant === "gold"
                  ? colors.secondaryForeground
                  : colors.primaryForeground,
              fontFamily: "Inter_700Bold",
            },
          ]}
        >
          {number}
        </Text>
      </LinearGradient>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
        {sublabel ? (
          <Text style={[styles.sublabel, { color: colors.mutedForeground }]}>
            {sublabel}
          </Text>
        ) : null}
        {isMaster ? (
          <View
            style={[
              styles.masterBadge,
              { backgroundColor: colors.purpleMid, borderColor: colors.primary },
            ]}
          >
            <Text style={[styles.masterText, { color: colors.gold }]}>
              MASTER
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  number: {
    textAlign: "center",
  },
  labelContainer: {
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
  },
  sublabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  masterBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 2,
  },
  masterText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
});
