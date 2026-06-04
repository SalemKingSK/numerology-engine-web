import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useCallback, useMemo } from "react";
import {
  ActivityIndicator, Platform, Pressable, ScrollView,
  StyleSheet, Text, View, Alert,
} from "react-native";
import * as Speech from "expo-speech";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useProfile } from "@/context/ProfileContext";
import { useColors } from "@/hooks/useColors";
import { ReadingCard } from "@/components/ReadingCard";
import { generateTransitionAdvisoryAI } from "@/lib/ai-service";
import { calculatePinnacles, lookupCompound } from "@/lib/numerology";
import {
  calculatePsychomatrix, SCALE_COLORS, SCALE_LABELS,
  type PsychomatrixResult,
} from "@/lib/numerology-data/psychomatrixData";
import { YD } from "@/lib/cosmic-fate/oracle";
import {
  ZODIAC_SYMBOLS, ZODIAC_ELEMENTS, ZODIAC_MODALITY, CHINESE_ANIMAL_EMOJI,
} from "@/lib/astrology";
import { calculatePersonalYear, calculatePersonalMonth } from "@/lib/numerology-engine";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const CHALLENGE_TEXT: Record<number, string> = {
  0: "No specific defect assigned — the universe offers free will and sovereignty. Without forced friction the risk is self-sabotage or drift; the gift is the power to choose your own mountain.",
  1: "Self-doubt and excessive dependence on others. The lesson: cultivate true independence, originate your own ideas, and stand firm in your convictions without bullying.",
  2: "Extreme sensitivity, timidity, and an inability to handle conflict. The lesson: develop emotional resilience while keeping your natural empathy intact.",
  3: "Repressed self-expression, self-criticism, and scattered energy. The lesson: communicate authentically, finish what you start, and stop comparing yourself to others.",
  4: "Laziness, disorder, or work-obsession to the exclusion of rest. The lesson: build disciplined routines without becoming rigid, and find dignity in honest effort.",
  5: "Fear of change, or the opposite — reckless over-indulgence in sensation. The lesson: embrace growth and variety while exercising discernment.",
  6: "Excessive perfectionism in relationships and domestic life, or the abdication of responsibility. The lesson: love unconditionally while maintaining healthy boundaries.",
  7: "Isolation, cynicism, and an inability to trust. The lesson: develop genuine faith — in yourself, in others, and in something greater than the rational mind.",
  8: "Power struggles, materialism, and poor financial judgment. The lesson: exercise authority with compassion and build lasting wealth through ethical means.",
};

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

function NumberBadge({ number, label, color }: { number: number | string; label: string; color?: string }) {
  const colors = useColors();
  return (
    <View style={[styles.badge, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.badgeNum, { color: color ?? colors.gold }]}>{number}</Text>
      <Text style={[styles.badgeLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

function SectionHeader({ title, color }: { title: string; color?: string }) {
  const colors = useColors();
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.sectionHeaderLine, { backgroundColor: color ?? colors.primary }]} />
      <Text style={[styles.sectionHeaderText, { color: color ?? colors.primary }]}>{title}</Text>
      <View style={[styles.sectionHeaderLine, { backgroundColor: color ?? colors.primary, flex: 1, opacity: 0.3 }]} />
    </View>
  );
}

function LoShuGridView({ grid, numberCounts }: { grid: (string | null)[][]; numberCounts: Record<string, number> }) {
  const colors = useColors();
  // Lo Shu layout: [4,9,2], [3,5,7], [8,1,6]
  const gridNumbers = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  return (
    <View style={styles.loShuGrid}>
      {gridNumbers.map((num, idx) => {
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        const cell = grid[row][col];
        const hasNum = !!cell;
        return (
          <View key={num} style={[styles.loShuCell, {
            backgroundColor: hasNum ? "#7c3aed22" : colors.muted,
            borderColor: hasNum ? "#7c3aed55" : colors.border,
          }]}>
            <Text style={[styles.loShuCellNum, { color: hasNum ? "#a78bfa" : colors.border }]}>
              {cell || num}
            </Text>
            {!hasNum && <Text style={[styles.loShuEmpty, { color: colors.border }]}>○</Text>}
          </View>
        );
      })}
    </View>
  );
}

function PsychomatrixGridView({ result }: { result: PsychomatrixResult }) {
  const colors = useColors();
  // Psychomatrix layout: [1,4,7], [2,5,8], [3,6,9]
  const cells = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ];
  return (
    <View style={styles.psychoGrid}>
      {cells.map((row, ri) => (
        <View key={ri} style={styles.psychoRow}>
          {row.map(digit => {
            const count = result.counts[digit] || 0;
            const reading = result.cellReadings.find(c => c.digit === digit);
            const scale = reading?.scale ?? "absent";
            const cellColor = SCALE_COLORS[scale] ?? "#6b7280";
            return (
              <View key={digit} style={[styles.psychoCell, { backgroundColor: `${cellColor}22`, borderColor: `${cellColor}55` }]}>
                <Text style={[styles.psychoCellDigit, { color: colors.mutedForeground }]}>{digit}</Text>
                <Text style={[styles.psychoCellValue, { color: cellColor }]}>
                  {count > 0 ? String(digit).repeat(count) : "—"}
                </Text>
                <Text style={[styles.psychoCellLabel, { color: cellColor }]}>
                  {reading ? SCALE_LABELS[scale] : "Absent"}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────────

export default function ReadingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { currentInput, numerologyData, astrologyData, isCalculated, saveCurrentProfile } = useProfile();

  const [aiText, setAiText] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [saved, setSaved] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const personalYear = useMemo(() => {
    if (!currentInput) return null;
    return calculatePersonalYear(currentInput.day, currentInput.month, currentYear);
  }, [currentInput, currentYear]);

  const personalMonth = useMemo(() => {
    if (!personalYear) return null;
    return calculatePersonalMonth(personalYear, currentMonth);
  }, [personalYear, currentMonth]);

  const pinnacles = useMemo(() => {
    if (!currentInput || !numerologyData) return [];
    return calculatePinnacles(
      numerologyData.destinyNum,
      currentInput.day,
      currentInput.month,
      currentInput.year,
      currentYear,
    );
  }, [currentInput, numerologyData, currentYear]);

  const psychomatrix = useMemo(() => {
    if (!currentInput) return null;
    return calculatePsychomatrix(currentInput.day, currentInput.month, currentInput.year);
  }, [currentInput]);

  const oracle = useMemo(() => personalYear ? YD[personalYear] ?? null : null, [personalYear]);

  const handleSave = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await saveCurrentProfile();
    setSaved(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleAI = async () => {
    if (!currentInput || !numerologyData || !astrologyData || !personalYear) return;
    setAiLoading(true);
    setAiText(null);
    try {
      const activePinnacle = pinnacles.find(p => p.active) ?? pinnacles[0];
      const prompt = `You are a master numerologist and astrologer providing a comprehensive transition advisory.

PROFILE: ${currentInput.name}, born ${currentInput.day}/${currentInput.month}/${currentInput.year}, ${currentInput.gender}

NUMEROLOGY:
- Psyche Number: ${numerologyData.psycheNum} — ${numerologyData.psychicMeaning.title}
- Destiny Number: ${numerologyData.destinyNum} — ${numerologyData.destinyMeaning.title}
- Kua Number: ${numerologyData.kuaNum} (${numerologyData.kuaAttributes?.element || ''} element)
- Personal Year ${currentYear}: ${personalYear} — ${oracle?.title || ''}
- Personal Month: ${personalMonth}
${numerologyData.compoundNum ? `- Life Compound: ${numerologyData.compoundNum}/${numerologyData.destinyNum}` : ''}
${activePinnacle ? `- Active Pinnacle: Stage ${activePinnacle.stage}, Number ${activePinnacle.p} (ages ${activePinnacle.ages})` : ''}

ASTROLOGY:
- Western Sign: ${astrologyData.western_sign} (${ZODIAC_ELEMENTS[astrologyData.western_sign] ?? ''} / ${ZODIAC_MODALITY[astrologyData.western_sign] ?? ''})
- Chinese Sign: ${astrologyData.element} ${astrologyData.sign}
- New Astrology: ${astrologyData.new_astrology_sign}

ARROWS OF STRENGTH: ${numerologyData.arrowsOfStrength.map(a => a.name).join(', ') || 'None'}
ARROWS OF WEAKNESS: ${numerologyData.arrowsOfWeakness.map(a => a.name).join(', ') || 'None'}

Provide a detailed, unabridged transition advisory covering:
1. The dominant energies of this Personal Year ${personalYear} and what it means for their specific Psyche ${numerologyData.psycheNum} / Destiny ${numerologyData.destinyNum} combination
2. How their ${astrologyData.western_sign} nature interacts with their ${astrologyData.element} ${astrologyData.sign} Chinese sign this year
3. Specific areas of life that will be activated (career, relationships, spirituality, finances)
4. The karmic themes and soul lessons being presented
5. Practical guidance and timing for key decisions
6. Their strengths to leverage and shadows to watch

Be specific, profound, and unabridged — no summaries or shortened meanings. Give the full, real reading.`;

      const result = await generateTransitionAdvisoryAI(prompt);
      setAiText(result);
    } catch (err: any) {
      Alert.alert("AI Advisory", err.message || "Unable to generate advisory. Check your connection.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleReadAloud = useCallback(async () => {
    if (speaking) {
      await Speech.stop();
      setSpeaking(false);
      return;
    }
    if (!currentInput || !numerologyData || !astrologyData) return;
    setSpeaking(true);
    const text = [
      `Profile for ${currentInput.name}, born ${currentInput.day} ${MONTH_NAMES[currentInput.month - 1]} ${currentInput.year}.`,
      `Western sign: ${astrologyData.western_sign}. Chinese sign: ${astrologyData.element} ${astrologyData.sign}.`,
      `Psyche number ${numerologyData.psycheNum}: ${numerologyData.psychicMeaning.title}. ${numerologyData.psychicMeaning.description}`,
      `Destiny number ${numerologyData.destinyNum}: ${numerologyData.destinyMeaning.title}. ${numerologyData.destinyMeaning.description}`,
      `Kua number ${numerologyData.kuaNum}. Lucky element: ${numerologyData.kuaAttributes?.element || 'unknown'}.`,
      personalYear ? `Personal Year ${currentYear}: year number ${personalYear}. ${oracle?.overview || ''}` : '',
      aiText ? `AI Advisory: ${aiText}` : '',
    ].filter(Boolean).join(' ');

    Speech.speak(text, {
      language: 'en',
      rate: 0.9,
      onDone: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  }, [speaking, currentInput, numerologyData, astrologyData, personalYear, oracle, aiText, currentYear]);

  if (!isCalculated || !currentInput || !numerologyData || !astrologyData) {
    return (
      <View style={[styles.emptyState, { backgroundColor: colors.background, paddingTop: insets.top + (Platform.OS === "web" ? 67 : 16) }]}>
        <LinearGradient colors={["#9b51ec11","#d4af3711"]} style={styles.emptyOrb} />
        <Feather name="compass" size={48} color={colors.border} />
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No Reading Yet</Text>
        <Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>
          Enter your birth information on the Calculate tab to reveal your full cosmic profile.
        </Text>
        <Pressable onPress={() => router.push("/(tabs)/index")} style={({ pressed }) => [styles.emptyBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
          <Feather name="compass" size={16} color="#fff" />
          <Text style={styles.emptyBtnText}>Calculate Now</Text>
        </Pressable>
      </View>
    );
  }

  const { psycheNum, destinyNum, kuaNum, psychicMeaning, destinyMeaning, kuaAttributes,
    loShuGrid, numberCounts, arrowsOfStrength, arrowsOfWeakness,
    compoundNum, compoundMeaning, specialTraitMeaning, karmicFateNum, karmicFateMeaning } = numerologyData;

  const { western_sign, sign, element, zodiacData, signData, new_astrology_sign } = astrologyData;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[styles.container, { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 16), paddingBottom: insets.bottom + 120 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <View style={[styles.profileHeader, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <LinearGradient colors={["#9b51ec18","#d4af3710"]} style={StyleSheet.absoluteFill} />
        <View style={styles.profileHeaderTop}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.profileName, { color: colors.foreground }]} numberOfLines={2}>{currentInput.name}</Text>
            <Text style={[styles.profileDOB, { color: colors.mutedForeground }]}>
              {currentInput.day} {MONTH_NAMES[currentInput.month - 1]} {currentInput.year} · {currentInput.gender}
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <Pressable onPress={handleReadAloud} style={[styles.iconBtn, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Feather name={speaking ? "pause" : "volume-2"} size={17} color={speaking ? colors.primary : colors.mutedForeground} />
            </Pressable>
            <Pressable onPress={handleSave} style={[styles.iconBtn, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Feather name="bookmark" size={17} color={saved ? colors.gold : colors.mutedForeground} />
            </Pressable>
          </View>
        </View>
        {personalYear && (
          <View style={[styles.alertBanner, { backgroundColor: `#7c3aed22`, borderColor: `#7c3aed44` }]}>
            <Feather name="zap" size={13} color="#a78bfa" />
            <Text style={[styles.alertText, { color: "#a78bfa" }]}>
              {currentYear} · Personal Year {personalYear}{oracle ? ` — ${oracle.title}` : ''} · Month {personalMonth}
            </Text>
          </View>
        )}
      </View>

      {/* ── Summary Number Cards ── */}
      <View style={styles.badgeRow}>
        <NumberBadge number={psycheNum} label="Psyche" color={colors.gold} />
        <NumberBadge number={destinyNum} label="Destiny" color={colors.gold} />
        <NumberBadge number={kuaNum} label="Kua" color="#a78bfa" />
        {personalYear && <NumberBadge number={personalYear} label={`Year ${currentYear}`} color="#34d399" />}
        {personalMonth && <NumberBadge number={personalMonth} label={`Month ${MONTH_NAMES[currentMonth - 1].slice(0, 3)}`} color="#60a5fa" />}
      </View>

      {/* ══════════════════════════════════════════
          SECTION: ZODIAC & ASTROLOGY
      ══════════════════════════════════════════ */}
      <SectionHeader title="ZODIAC & ASTROLOGY" color="#7c3aed" />

      {/* Western Zodiac */}
      <ReadingCard
        title={`${ZODIAC_SYMBOLS[western_sign] ?? ''} ${western_sign}`}
        subtitle={`${ZODIAC_ELEMENTS[western_sign] ?? ''} · ${ZODIAC_MODALITY[western_sign] ?? ''}`}
        badge="Western"
        badgeColor="#7c3aed"
        body={[
          `Your Western zodiac sign is ${western_sign} — a ${ZODIAC_ELEMENTS[western_sign] ?? ''} sign of the ${ZODIAC_MODALITY[western_sign] ?? ''} modality.`,
          zodiacData?.introduction ?? '',
        ].filter(Boolean).join('\n\n')}
        accentColor="#7c3aed"
      />

      {/* Chinese Zodiac */}
      <ReadingCard
        title={`${CHINESE_ANIMAL_EMOJI[sign] ?? ''} ${element} ${sign}`}
        subtitle={`Chinese Zodiac · ${currentInput.year}`}
        badge="Chinese"
        badgeColor="#d97706"
        body={[
          `You were born in the Year of the ${element} ${sign}.`,
          zodiacData?.introduction ?? '',
        ].filter(Boolean).join('\n\n')}
        accentColor="#d97706"
        extraContent={
          zodiacData?.elements ? (
            <View style={{ gap: 8, marginTop: 8 }}>
              <Text style={[styles.subSectionTitle, { color: "#d97706" }]}>ELEMENTAL QUALITIES</Text>
              {Object.entries(zodiacData.elements).slice(0, 5).map(([k, v]) => (
                <View key={k} style={styles.kvRow}>
                  <Text style={[styles.kvKey, { color: colors.mutedForeground }]}>{k}</Text>
                  <Text style={[styles.kvVal, { color: colors.foreground }]}>{v as string}</Text>
                </View>
              ))}
            </View>
          ) : undefined
        }
      />

      {/* New Astrology */}
      {signData?.description && (
        <ReadingCard
          title={new_astrology_sign}
          subtitle="New Astrology Combined Sign"
          badge="New Astrology"
          badgeColor="#06b6d4"
          body={signData.description}
          accentColor="#06b6d4"
          extraContent={
            <View style={{ gap: 12, marginTop: 8 }}>
              {signData.love && (
                <View>
                  <Text style={[styles.subSectionTitle, { color: "#06b6d4" }]}>LOVE & RELATIONSHIPS</Text>
                  <Text style={[styles.bodyText, { color: colors.foreground }]}>{signData.love}</Text>
                </View>
              )}
              {signData.profession && (
                <View>
                  <Text style={[styles.subSectionTitle, { color: "#06b6d4" }]}>CAREER & PROFESSION</Text>
                  <Text style={[styles.bodyText, { color: colors.foreground }]}>{signData.profession}</Text>
                </View>
              )}
              {signData.homeAndFamily && (
                <View>
                  <Text style={[styles.subSectionTitle, { color: "#06b6d4" }]}>HOME & FAMILY</Text>
                  <Text style={[styles.bodyText, { color: colors.foreground }]}>{signData.homeAndFamily}</Text>
                </View>
              )}
            </View>
          }
        />
      )}

      {/* ══════════════════════════════════════════
          SECTION: CORE NUMEROLOGY
      ══════════════════════════════════════════ */}
      <SectionHeader title="CORE NUMEROLOGY" color={colors.gold} />

      {/* Psyche Number */}
      <ReadingCard
        title={`Psyche ${psycheNum} — ${psychicMeaning.title}`}
        subtitle="Day of Birth · Chaldean System"
        badge={`Psyche ${psycheNum}`}
        badgeColor={colors.gold}
        body={psychicMeaning.description}
        accentColor={colors.gold}
        defaultExpanded
      />

      {/* Destiny Number */}
      <ReadingCard
        title={`Destiny ${destinyNum} — ${destinyMeaning.title}`}
        subtitle="Full Date Reduction"
        badge={`Destiny ${destinyNum}`}
        badgeColor={colors.gold}
        body={destinyMeaning.description}
        accentColor={colors.gold}
      />

      {/* Compound / Life Number */}
      {compoundNum && compoundMeaning && (
        <ReadingCard
          title={`Compound ${compoundNum}/${destinyNum} — Life Vibration`}
          subtitle="Unreduced Sum · Chaldean"
          badge={`Compound ${compoundNum}`}
          badgeColor="#f59e0b"
          body={compoundMeaning}
          accentColor="#f59e0b"
        />
      )}

      {/* Special Trait / Birth Day Meaning */}
      {specialTraitMeaning && currentInput.day >= 10 && (
        <ReadingCard
          title={`Birthday ${currentInput.day} — Special Trait`}
          subtitle="Day Compound Energy"
          badge={`Day ${currentInput.day}`}
          badgeColor="#a78bfa"
          body={specialTraitMeaning}
          accentColor="#a78bfa"
        />
      )}

      {/* Karmic Fate */}
      {karmicFateNum && karmicFateMeaning && (
        <ReadingCard
          title={`Karmic Fate ${karmicFateNum} — Linda Goodman`}
          subtitle="Day + Month + Year Sum"
          badge="Karmic Fate"
          badgeColor="#ef4444"
          body={karmicFateMeaning}
          accentColor="#ef4444"
        />
      )}

      {/* Kua Number */}
      <ReadingCard
        title={`Kua ${kuaNum} — ${kuaAttributes?.element ?? ''} Group`}
        subtitle={`${kuaAttributes?.trigram ?? ''} · ${kuaAttributes?.group ?? ''} Group`}
        badge={`Kua ${kuaNum}`}
        badgeColor="#a78bfa"
        body={[
          kuaAttributes?.element ? `Element: ${kuaAttributes.element}` : '',
          kuaAttributes?.lucky_colours?.length ? `Lucky Colours: ${kuaAttributes.lucky_colours.join(', ')}` : '',
        ].filter(Boolean).join('\n')}
        accentColor="#a78bfa"
        extraContent={
          kuaAttributes?.directions && Object.keys(kuaAttributes.directions).length > 0 ? (
            <View style={{ gap: 8, marginTop: 8 }}>
              <Text style={[styles.subSectionTitle, { color: "#a78bfa" }]}>POWER DIRECTIONS</Text>
              {Object.entries(kuaAttributes.directions).map(([dir, meaning]) => (
                <View key={dir} style={styles.kvRow}>
                  <Text style={[styles.kvKey, { color: colors.mutedForeground }]}>{dir}</Text>
                  <Text style={[styles.kvVal, { color: colors.foreground }]}>{meaning as string}</Text>
                </View>
              ))}
            </View>
          ) : undefined
        }
      />

      {/* ══════════════════════════════════════════
          SECTION: PERSONAL YEAR / COSMIC FATE
      ══════════════════════════════════════════ */}
      {personalYear && oracle && (
        <>
          <SectionHeader title="COSMIC FATE MAP" color="#34d399" />

          <ReadingCard
            title={`Year ${personalYear} — ${oracle.title}`}
            subtitle={oracle.sub}
            badge={`Personal Year ${personalYear}`}
            badgeColor="#34d399"
            body={oracle.overview}
            accentColor="#34d399"
            defaultExpanded
            extraContent={
              <View style={{ gap: 16, marginTop: 12 }}>
                {oracle.planet && (
                  <View>
                    <Text style={[styles.subSectionTitle, { color: "#34d399" }]}>PLANETARY RULER · {oracle.planet}</Text>
                    {oracle.vedic && <Text style={[styles.bodyText, { color: colors.foreground }]}>{oracle.vedic}</Text>}
                  </View>
                )}
                {oracle.esoteric && (
                  <View>
                    <Text style={[styles.subSectionTitle, { color: "#34d399" }]}>ESOTERIC THEME</Text>
                    <Text style={[styles.bodyText, { color: colors.foreground }]}>{oracle.esoteric}</Text>
                  </View>
                )}
                {oracle.pyth && (
                  <View>
                    <Text style={[styles.subSectionTitle, { color: "#34d399" }]}>SHADOW & CHALLENGE</Text>
                    <Text style={[styles.bodyText, { color: colors.foreground }]}>{oracle.pyth}</Text>
                  </View>
                )}
                {oracle.chinese && (
                  <View>
                    <Text style={[styles.subSectionTitle, { color: "#34d399" }]}>CHINESE PERSPECTIVE</Text>
                    <Text style={[styles.bodyText, { color: colors.foreground }]}>{oracle.chinese}</Text>
                  </View>
                )}
                {oracle.chald && (
                  <View>
                    <Text style={[styles.subSectionTitle, { color: "#34d399" }]}>CHALDEAN ANALYSIS</Text>
                    <Text style={[styles.bodyText, { color: colors.foreground }]}>{oracle.chald}</Text>
                  </View>
                )}
                {oracle.pr && oracle.pr.length > 0 && (
                  <View style={{ gap: 8 }}>
                    <Text style={[styles.subSectionTitle, { color: "#34d399" }]}>PRACTICES</Text>
                    {oracle.pr.map((p: any, i: number) => (
                      <View key={i} style={[styles.practiceRow, { backgroundColor: colors.muted }]}>
                        <Text style={styles.practiceIcon}>{p.i}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.practiceName, { color: colors.foreground }]}>{p.n}</Text>
                          <Text style={[styles.practiceDesc, { color: colors.mutedForeground }]}>{p.d}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            }
          />
        </>
      )}

      {/* ══════════════════════════════════════════
          SECTION: LO SHU GRID
      ══════════════════════════════════════════ */}
      <SectionHeader title="LO SHU GRID" color="#60a5fa" />

      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionCardTitle, { color: "#60a5fa" }]}>Numerological Grid of Birth</Text>
        <Text style={[styles.sectionCardSub, { color: colors.mutedForeground }]}>
          Numbers present in your birth date, Psyche, Destiny & Kua mapped to the 3×3 Lo Shu square.
        </Text>
        <LoShuGridView grid={loShuGrid} numberCounts={numberCounts} />
        <View style={styles.gridLegend}>
          <Text style={[styles.gridLegendText, { color: colors.mutedForeground }]}>
            Present: highlighted · Absent: dimmed · Repeated: shown as multiples
          </Text>
        </View>
      </View>

      {/* ══════════════════════════════════════════
          SECTION: ARROWS OF INDIVIDUALITY
      ══════════════════════════════════════════ */}
      {(arrowsOfStrength.length > 0 || arrowsOfWeakness.length > 0) && (
        <>
          <SectionHeader title="ARROWS OF INDIVIDUALITY" color="#f59e0b" />

          {arrowsOfStrength.map(arrow => (
            <ReadingCard
              key={arrow.id}
              title={`▲ ${arrow.name}`}
              subtitle={`${arrow.category ?? 'Arrow of Strength'} · Numbers: ${arrow.numbers.join(', ')}`}
              badge="Strength"
              badgeColor="#34d399"
              body={arrow.description}
              accentColor="#34d399"
            />
          ))}

          {arrowsOfWeakness.map(arrow => (
            <ReadingCard
              key={arrow.id}
              title={`▽ ${arrow.name}`}
              subtitle={`${arrow.category ?? 'Arrow of Weakness'} · Numbers: ${arrow.numbers.join(', ')}`}
              badge="Deficiency"
              badgeColor="#f87171"
              body={arrow.description}
              accentColor="#f87171"
            />
          ))}
        </>
      )}

      {/* ══════════════════════════════════════════
          SECTION: PSYCHOMATRIX (ALEXANDROV)
      ══════════════════════════════════════════ */}
      {psychomatrix && (
        <>
          <SectionHeader title="PSYCHOMATRIX — ALEXANDROV" color="#a78bfa" />

          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionCardTitle, { color: "#a78bfa" }]}>Alexandrov's Method</Text>
            <Text style={[styles.sectionCardSub, { color: colors.mutedForeground }]}>
              Working numbers: {psychomatrix.first} · {psychomatrix.second} · {Math.abs(psychomatrix.third)} · {psychomatrix.fourth}
            </Text>
            <PsychomatrixGridView result={psychomatrix} />
          </View>

          {psychomatrix.cellReadings.map(reading => (
            <ReadingCard
              key={reading.digit}
              title={`${reading.digit} — ${reading.cellName}`}
              subtitle={`${reading.label} (${reading.scale})`}
              badge={reading.count > 0 ? String(reading.digit).repeat(Math.min(reading.count, 5)) : `${reading.digit} absent`}
              badgeColor={SCALE_COLORS[reading.scale] ?? "#6b7280"}
              body={reading.verbatim}
              accentColor={SCALE_COLORS[reading.scale] ?? "#6b7280"}
              extraContent={
                reading.difficultyVerbatim ? (
                  <View style={{ marginTop: 8 }}>
                    <Text style={[styles.subSectionTitle, { color: SCALE_COLORS[reading.scale] ?? "#6b7280" }]}>DIFFICULTY & GROWTH</Text>
                    <Text style={[styles.bodyText, { color: colors.foreground }]}>{reading.difficultyVerbatim}</Text>
                  </View>
                ) : undefined
              }
            />
          ))}

          {psychomatrix.zeroAnalysis.hasAnyZero && (
            <ReadingCard
              title="Zero Analysis"
              subtitle="Absence Interpretation"
              badge="Zeros Present"
              badgeColor="#6b7280"
              body={psychomatrix.zeroAnalysis.interpretations.join('\n\n')}
              accentColor="#6b7280"
            />
          )}
        </>
      )}

      {/* ══════════════════════════════════════════
          SECTION: PINNACLES & CHALLENGES
      ══════════════════════════════════════════ */}
      {pinnacles.length > 0 && (
        <>
          <SectionHeader title="PINNACLES & CHALLENGES" color="#f97316" />

          {pinnacles.map(stage => {
            const isActive = stage.active;
            const compoundData = stage.compound;
            const body = [
              `Pinnacle Number: ${stage.p}${stage.rawP !== stage.p ? ` (Compound ${stage.rawP}/${stage.p})` : ''}`,
              compoundData ? `\n${compoundData.name}\n\n${compoundData.vibrationalEssence}` : '',
              compoundData?.karmicDynamics ? `\nKarmic Dynamics:\n${compoundData.karmicDynamics}` : '',
              compoundData?.manifestationPatterns ? `\nManifestation:\n${compoundData.manifestationPatterns}` : '',
              `\nChallenge Number: ${stage.c}\n${CHALLENGE_TEXT[stage.c] ?? ''}`,
            ].filter(Boolean).join('');

            return (
              <ReadingCard
                key={stage.stage}
                title={`${stage.label} (Ages ${stage.ages})`}
                subtitle={`Pinnacle ${stage.p} · Challenge ${stage.c}`}
                badge={isActive ? "ACTIVE NOW" : `Stage ${stage.stage}`}
                badgeColor={isActive ? "#f97316" : "#6b7280"}
                body={body}
                accentColor={isActive ? "#f97316" : "#6b7280"}
                defaultExpanded={isActive}
              />
            );
          })}
        </>
      )}

      {/* ══════════════════════════════════════════
          SECTION: AI ADVISORY
      ══════════════════════════════════════════ */}
      <SectionHeader title="AI TRANSITION ADVISORY" color="#7c3aed" />

      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionCardTitle, { color: "#7c3aed" }]}>Personalised AI Reading</Text>
        <Text style={[styles.sectionCardSub, { color: colors.mutedForeground }]}>
          A deep, unabridged advisory combining all your numerological and astrological data.
        </Text>

        {aiText && (
          <Text style={[styles.aiBody, { color: colors.foreground }]}>{aiText}</Text>
        )}

        <Pressable
          onPress={handleAI}
          disabled={aiLoading}
          style={({ pressed }) => [styles.aiBtn, { backgroundColor: "#7c3aed", opacity: pressed || aiLoading ? 0.7 : 1 }]}
        >
          {aiLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Feather name="cpu" size={16} color="#fff" />
          )}
          <Text style={styles.aiBtnText}>{aiText ? "Regenerate Advisory" : "Generate AI Advisory"}</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 14, gap: 12 },
  // Profile header
  profileHeader: { borderRadius: 16, borderWidth: 1, padding: 18, gap: 10, overflow: "hidden" },
  profileHeaderTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  profileName: { fontSize: 20, fontFamily: "Inter_700Bold", lineHeight: 26 },
  profileDOB: { fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 2 },
  headerButtons: { flexDirection: "row", gap: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 10, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  alertBanner: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 8, borderWidth: 1, paddingVertical: 8, paddingHorizontal: 12 },
  alertText: { fontSize: 12, fontFamily: "Inter_500Medium", flex: 1 },
  // Summary badges
  badgeRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  badge: { borderRadius: 12, borderWidth: 1, paddingVertical: 8, paddingHorizontal: 14, alignItems: "center", gap: 2 },
  badgeNum: { fontSize: 20, fontFamily: "Inter_700Bold" },
  badgeLabel: { fontSize: 9, fontFamily: "Inter_500Medium", letterSpacing: 0.5 },
  // Section headers
  sectionHeaderRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  sectionHeaderLine: { width: 3, height: 14, borderRadius: 2 },
  sectionHeaderText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },
  // Section cards
  sectionCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 12 },
  sectionCardTitle: { fontSize: 15, fontFamily: "Inter_700Bold" },
  sectionCardSub: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  // Lo Shu Grid
  loShuGrid: { flexDirection: "row", flexWrap: "wrap", width: "100%", gap: 6 },
  loShuCell: { width: "30.5%", aspectRatio: 1, borderRadius: 10, borderWidth: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  loShuCellNum: { fontSize: 18, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  loShuEmpty: { fontSize: 9, fontFamily: "Inter_400Regular" },
  gridLegend: { marginTop: 4 },
  gridLegendText: { fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center" },
  // Psychomatrix Grid
  psychoGrid: { gap: 6 },
  psychoRow: { flexDirection: "row", gap: 6 },
  psychoCell: { flex: 1, borderRadius: 10, borderWidth: 1, padding: 8, alignItems: "center", gap: 2 },
  psychoCellDigit: { fontSize: 10, fontFamily: "Inter_400Regular" },
  psychoCellValue: { fontSize: 14, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  psychoCellLabel: { fontSize: 9, fontFamily: "Inter_500Medium", textAlign: "center" },
  // Sub-section content
  subSectionTitle: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 1.5, marginBottom: 6 },
  bodyText: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 },
  kvRow: { flexDirection: "row", gap: 12 },
  kvKey: { fontSize: 12, fontFamily: "Inter_500Medium", width: 100 },
  kvVal: { flex: 1, fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  practiceRow: { flexDirection: "row", gap: 12, borderRadius: 10, padding: 10, alignItems: "flex-start" },
  practiceIcon: { fontSize: 20 },
  practiceName: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  practiceDesc: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18, marginTop: 2 },
  // AI
  aiBody: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 21 },
  aiBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 10, paddingVertical: 13 },
  aiBtnText: { color: "#fff", fontSize: 14, fontFamily: "Inter_600SemiBold" },
  // Empty state
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 16 },
  emptyOrb: { position: "absolute", width: 300, height: 300, borderRadius: 150 },
  emptyTitle: { fontSize: 20, fontFamily: "Inter_700Bold", textAlign: "center" },
  emptyBody: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
  emptyBtn: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24 },
  emptyBtnText: { color: "#fff", fontSize: 15, fontFamily: "Inter_600SemiBold" },
});
