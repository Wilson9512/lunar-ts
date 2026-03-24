import { toLunar } from "./lunar";
import {
  GZ_BASE_YEAR,
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
} from './constants';
import { GZ } from "./types";

/**
 * 根據公曆日期取得干支
 * Get ganzhi by Gregorian date
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 干支中文字；日期超出支援範圍（1900–2100）時回傳 null
 */
export function getGZ(timestamp: number): GZ | null {
  const lunar = toLunar(timestamp);

  // 日期超出支援範圍（1900/1/31 以前或 2100 以後）
  if (!lunar) return null;

  const yearDiff = lunar.lYear - GZ_BASE_YEAR;
  const hsIndex = ((yearDiff % 10) + 10) % 10;
  const ebIndex = ((yearDiff % 12) + 12) % 12;

  return (HEAVENLY_STEMS[hsIndex] + EARTHLY_BRANCHES[ebIndex]) as GZ;
}