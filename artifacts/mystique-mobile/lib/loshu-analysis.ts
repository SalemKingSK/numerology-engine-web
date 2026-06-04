import {
  LOSHU_NUMBER_DEFINITIONS,
  LIFE_PATH_CONFLICTS,
  REMEDIES,
  type NumberDefinition,
  type LifePathConflict,
  type Remedy,
} from "./loshu-definitions";

export function reduceToSingleDigit(n: number): number {
  let val = Math.abs(n);
  while (val > 9) {
    val = String(val)
      .split("")
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return val || 9;
}

export function calculateLifePath(birthDate: string): number {
  const digits = birthDate.replace(/\D/g, "").split("").map(Number);
  const sum = digits.reduce((acc, d) => acc + d, 0);
  return reduceToSingleDigit(sum);
}

export function getGridCounts(birthDate: string): Record<number, number> {
  const counts: Record<number, number> = {};
  birthDate
    .replace(/\D/g, "")
    .split("")
    .forEach((d) => {
      const n = parseInt(d, 10);
      if (n >= 1 && n <= 9) {
        counts[n] = (counts[n] || 0) + 1;
      }
    });
  return counts;
}

export interface NumberAnalysis {
  number: number;
  count: number;
  definition: NumberDefinition;
  isDrowning: boolean;
  drownsNumbers: number[];
  remedy: Remedy;
  lifePathConflict: LifePathConflict | null;
  lifePath: number;
}

export function analyzeNumber(
  number: number,
  birthDate: string,
  actualCount?: number
): NumberAnalysis {
  const counts = getGridCounts(birthDate);
  const count = actualCount !== undefined ? actualCount : (counts[number] ?? 0);
  const definition = LOSHU_NUMBER_DEFINITIONS[number];
  const lifePath = calculateLifePath(birthDate);

  const isDrowning = count >= 3;
  const drownsNumbers = isDrowning ? (definition.drownsNumbers ?? []) : [];

  const conflictDef = LIFE_PATH_CONFLICTS[number] ?? null;
  const lifePathConflict =
    lifePath === number && isDrowning ? conflictDef : null;

  return {
    number,
    count,
    definition,
    isDrowning,
    drownsNumbers,
    remedy: REMEDIES[number],
    lifePathConflict,
    lifePath,
  };
}
