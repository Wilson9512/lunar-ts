import { toLunar } from "./lunar";
import {
  ZODIAC_ANIMALS,
  ZODIAC_MAP,
} from './constants';
import { ZodiacAnimal } from "./types";

/**
 * 根據農曆年份取得生肖
 * Get zodiac animal by lunar year
 * 
 * @param year - 農曆年份 / Lunar year
 * @returns 生肖中文字 / Zodiac animal character
 */
function getAnimalString(year: number): string {
  return ZODIAC_ANIMALS[(year - 4) % 12];
}

/**
 * 根據公曆日期取得生肖
 * Get zodiac animal by lunar date
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 生肖英文 / Zodiac animal
 */
export function getZodiac(timestamp: number): ZodiacAnimal {
  const lunar = toLunar(timestamp);

  if (!lunar) throw new Error('Invalid date');

  const animal = getAnimalString(lunar.lYear);

  return ZODIAC_MAP[animal as keyof typeof ZODIAC_MAP];
}