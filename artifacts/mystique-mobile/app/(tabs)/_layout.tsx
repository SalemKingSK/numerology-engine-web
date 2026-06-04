import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";
import { useColors } from "@/hooks/useColors";

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "compass", selected: "compass.fill" }} />
        <Label>Calculate</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="reading">
        <Icon sf={{ default: "sparkles", selected: "sparkles" }} />
        <Label>Reading</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profiles">
        <Icon sf={{ default: "archivebox", selected: "archivebox.fill" }} />
        <Label>Archive</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView intensity={80} tint={isDark ? "dark" : "dark"} style={StyleSheet.absoluteFill} />
          ) : isWeb ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.card }]} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculate",
          tabBarIcon: ({ color }) =>
            isIOS ? <SymbolView name="compass" tintColor={color} size={24} /> : <Feather name="compass" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reading"
        options={{
          title: "Reading",
          tabBarIcon: ({ color }) =>
            isIOS ? <SymbolView name="sparkles" tintColor={color} size={24} /> : <Feather name="star" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: "Archive",
          tabBarIcon: ({ color }) =>
            isIOS ? <SymbolView name="archivebox" tintColor={color} size={24} /> : <Feather name="archive" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
