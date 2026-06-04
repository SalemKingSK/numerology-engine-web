import {
  FULL_ARROW_DEFINITIONS,
  EMPTY_ARROW_DEFINITIONS,
  SECONDARY_ARROW_DEFINITIONS,
  MINOR_ARROW_DEFINITIONS,
  type ArrowDefinition,
} from "./arrow-definitions";

function getGridCounts(birthDate: string, externalCounts?: Record<number, number>): Record<number, number> {
  const counts: Record<number, number> = externalCounts || {};
  if (!externalCounts) {
    birthDate
      .replace(/\D/g, "")
      .split("")
      .forEach((d) => {
        const n = parseInt(d, 10);
        if (n >= 1 && n <= 9) counts[n] = (counts[n] || 0) + 1;
      });
  }
  return counts;
}

export interface ArrowStatus {
  definition: ArrowDefinition;
  isActive: boolean;
  presentNumbers: number[];
  missingNumbers: number[];
}

export function getArrowStatus(
  arrow: ArrowDefinition,
  birthDate: string,
  externalCounts?: Record<number, number>
): ArrowStatus {
  const counts = getGridCounts(birthDate, externalCounts);
  const presentNumbers = arrow.numbers.filter((n) => (counts[n] ?? 0) > 0);
  const missingNumbers = arrow.numbers.filter((n) => !(counts[n] ?? 0));

  const isActive =
    arrow.state === "full"
      ? presentNumbers.length === arrow.numbers.length
      : missingNumbers.length === arrow.numbers.length;

  return { definition: arrow, isActive, presentNumbers, missingNumbers };
}

export function getActiveArrows(birthDate: string, externalCounts?: Record<number, number>): ArrowStatus[] {
  const all = [
    ...FULL_ARROW_DEFINITIONS,
    ...EMPTY_ARROW_DEFINITIONS,
    ...SECONDARY_ARROW_DEFINITIONS,
    ...MINOR_ARROW_DEFINITIONS
  ];
  return all
    .map((a) => getArrowStatus(a, birthDate, externalCounts))
    .filter((s) => s.isActive);
}
