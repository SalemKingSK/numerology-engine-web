import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { generateNumerologyData } from "@/lib/numerology-engine";
import { getAstroInsight } from "@/lib/astrology";
import type { AstroInsightInput, NumerologyData, AstroInsightOutput, FullProfile } from "@/lib/types";

const PROFILES_KEY = "@mystique_profiles_v2";

export interface SavedProfile {
  id: string;
  profile: FullProfile;
  savedAt: number;
}

interface ProfileContextValue {
  currentInput: AstroInsightInput | null;
  numerologyData: NumerologyData | null;
  astrologyData: AstroInsightOutput | null;
  savedProfiles: SavedProfile[];
  isCalculated: boolean;
  calculate: (input: AstroInsightInput) => void;
  saveCurrentProfile: () => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  loadProfile: (saved: SavedProfile) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [currentInput, setCurrentInput] = useState<AstroInsightInput | null>(null);
  const [numerologyData, setNumerologyData] = useState<NumerologyData | null>(null);
  const [astrologyData, setAstrologyData] = useState<AstroInsightOutput | null>(null);
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(PROFILES_KEY).then(raw => {
      if (raw) setSavedProfiles(JSON.parse(raw) as SavedProfile[]);
    }).catch(() => {});
  }, []);

  const calculate = useCallback((input: AstroInsightInput) => {
    const numData = generateNumerologyData(input);
    const astroData = getAstroInsight(input);
    setCurrentInput(input);
    setNumerologyData(numData);
    setAstrologyData(astroData);
    setIsCalculated(true);
  }, []);

  const saveCurrentProfile = useCallback(async () => {
    if (!currentInput || !numerologyData || !astrologyData) return;
    const entry: SavedProfile = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
      profile: { input: currentInput, numerology: numerologyData, astrology: astrologyData },
      savedAt: Date.now(),
    };
    const updated = [entry, ...savedProfiles];
    setSavedProfiles(updated);
    await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(updated));
  }, [currentInput, numerologyData, astrologyData, savedProfiles]);

  const deleteProfile = useCallback(async (id: string) => {
    const updated = savedProfiles.filter(p => p.id !== id);
    setSavedProfiles(updated);
    await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(updated));
  }, [savedProfiles]);

  const loadProfile = useCallback((saved: SavedProfile) => {
    setCurrentInput(saved.profile.input);
    setNumerologyData(saved.profile.numerology);
    setAstrologyData(saved.profile.astrology);
    setIsCalculated(true);
  }, []);

  return (
    <ProfileContext.Provider value={{
      currentInput, numerologyData, astrologyData, savedProfiles,
      isCalculated, calculate, saveCurrentProfile, deleteProfile, loadProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
