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
 * Get zodiac animal by Gregorian date
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 生肖英文；日期超出支援範圍（1900–2100）時回傳 null
 */
export function getZodiac(timestamp: number): ZodiacAnimal | null {
  const lunar = toLunar(timestamp);

  // 日期超出支援範圍（1900/1/31 以前或 2100 以後）
  if (!lunar) return null;

  const animal = getAnimalString(lunar.lYear);

  return ZODIAC_MAP[animal as keyof typeof ZODIAC_MAP];
}