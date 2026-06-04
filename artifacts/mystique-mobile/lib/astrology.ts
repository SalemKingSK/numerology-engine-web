import { CHINESE_CALENDAR } from './new-astrology/chinese-calendar';
import type { AstroInsightOutput } from './types';
import { zodiacData } from './zodiac';
import { NEW_ASTROLOGY_DATA } from './new-astrology';

export const getWesternZodiacSign = (day: number, month: number): string => {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  return "Capricorn";
};

export const getChineseZodiacSign = (day: number, month: number, year: number) => {
  const date = new Date(year, month - 1, day);
  for (const zodiacYear of CHINESE_CALENDAR) {
    const startDate = new Date(zodiacYear.start);
    const endDate = new Date(zodiacYear.end);
    date.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    if (date >= startDate && date <= endDate) {
      const [element, sign] = zodiacYear.title.split(' ');
      return { sign, element };
    }
  }
  const signs = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  const elements = ["Wood","Fire","Earth","Metal","Water"];
  const referenceYear = 1924;
  const yearOffset = year - referenceYear;
  const signIndex = yearOffset >= 0 ? yearOffset % 12 : (12 + (yearOffset % 12)) % 12;
  const elementIndex = yearOffset >= 0 ? Math.floor((yearOffset % 10) / 2) : Math.floor(((10 + (yearOffset % 10)) % 10) / 2);
  return { sign: signs[signIndex], element: elements[elementIndex] };
};

export const getAstroInsight = (input: { name: string; day: number; month: number; year: number; gender: string }): AstroInsightOutput => {
  const { year, month, day, name, gender } = input;
  const western_sign = getWesternZodiacSign(day, month);
  const { sign, element } = getChineseZodiacSign(day, month, year);
  const signDataForZodiac = (zodiacData as any)[sign] || {};
  const newAstrologySignKey = `${western_sign}/${sign}`;
  const signDataForNewAstrology = (NEW_ASTROLOGY_DATA as any)[newAstrologySignKey] || {};
  return {
    name,
    western_sign,
    sign,
    element,
    month,
    year,
    gender,
    new_astrology_sign: newAstrologySignKey,
    zodiacData: signDataForZodiac,
    signData: signDataForNewAstrology,
  };
};

export const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

export const ZODIAC_ELEMENTS: Record<string, string> = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
};

export const ZODIAC_MODALITY: Record<string, string> = {
  Aries: 'Cardinal', Cancer: 'Cardinal', Libra: 'Cardinal', Capricorn: 'Cardinal',
  Taurus: 'Fixed', Leo: 'Fixed', Scorpio: 'Fixed', Aquarius: 'Fixed',
  Gemini: 'Mutable', Virgo: 'Mutable', Sagittarius: 'Mutable', Pisces: 'Mutable',
};

export const CHINESE_ANIMAL_EMOJI: Record<string, string> = {
  Rat: '🐭', Ox: '🐂', Tiger: '🐯', Rabbit: '🐰',
  Dragon: '🐲', Snake: '🐍', Horse: '🐴', Goat: '🐏',
  Monkey: '🐒', Rooster: '🐓', Dog: '🐕', Pig: '🐷',
};
