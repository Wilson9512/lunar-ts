import { toLunar } from "./lunar";
import {
  GZ_BASE_YEAR,
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
} from './constants';
import { GZ } from "./types";

/**
 * 根據公曆日期取得干支
 * Get ganzhi by lunar date
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 干支中文字 / Ganzhi character
 */
export function getGZ(timestamp: number): GZ {
  const lunar = toLunar(timestamp);

  if (!lunar) throw new Error('Invalid date');

  const yearDiff = lunar.lYear - GZ_BASE_YEAR;
  const hsIndex = ((yearDiff % 10) + 10) % 10;
  const ebIndex = ((yearDiff % 12) + 12) % 12;

  return (HEAVENLY_STEMS[hsIndex] + EARTHLY_BRANCHES[ebIndex]) as GZ;
}