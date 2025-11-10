import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LUNAR_CALENDAR, MIN_YEAR, MAX_YEAR } from './constants';
import type { LunarDate } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 計算農曆年的總天數
 * Calculate total days in a lunar year
 * 
 * @param year - 農曆年份 / Lunar year
 * @returns 該年總天數 / Total days in the year
 */
function getLunarYearDays(year: number): number {
  const data = LUNAR_CALENDAR[year - MIN_YEAR];
  let days = 348; // 基準：12個月 × 29天 / Base: 12 months × 29 days

  // 檢查每個月是大月(30天)還是小月(29天) 
  // Check if each month is a big month (30 days) or small month (29 days)
  // Brian Kernighan's Algorithm
  let temp = data & 0xFFF0; // 只取前12個月的位元 (排除最後4位)
  while (temp) {
    days++;
    temp &= (temp - 1); // 每次移除最右邊的 1
  }

  return days + getLeapMonthDays(year);
}

/**
 * 取得閏月月份（0 表示該年無閏月）
 * Get leap month (0 means no leap month in that year)
 * 
 * @param year - 農曆年份 / Lunar year
 * @returns 閏月月份 (0-12) / Leap month (0-12)
 */
function getLeapMonth(year: number): number {
  return LUNAR_CALENDAR[year - MIN_YEAR] & 0xf;
}

/**
 * 取得閏月天數
 * Get days in leap month
 * 
 * @param year - 農曆年份 / Lunar year
 * @returns 閏月天數 (0/29/30) / Days in leap month (0/29/30)
 */
function getLeapMonthDays(year: number): number {
  const leapMonth = getLeapMonth(year);
  if (!leapMonth) return 0;

  const data = LUNAR_CALENDAR[year - MIN_YEAR];
  return (data & 0x10000) ? 30 : 29;
}

/**
 * 取得指定月份的天數
 * Get days in specific month
 * 
 * @param year - 農曆年份 / Lunar year
 * @param month - 農曆月份 (1-12) / Lunar month (1-12)
 * @returns 該月天數 (29/30) / Days in the month (29/30)
 */
function getMonthDays(year: number, month: number): number {
  const data = LUNAR_CALENDAR[year - MIN_YEAR];
  return (data & (0x10000 >> month)) ? 30 : 29;
}

/**
 * 公曆轉農曆
 * Convert Gregorian date to Lunar date
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 農曆日期物件，若日期無效則返回 null / Lunar date object, or null if invalid
 */
export function toLunar(timestamp: number): LunarDate | null {
  const beijing = dayjs(timestamp).tz('Asia/Shanghai');

  const year = beijing.year();
  const month = beijing.month() + 1;
  const day = beijing.date();
  
  // 驗證年份範圍
  // Validate year range
  if (year < MIN_YEAR || year > MAX_YEAR) {
    return null;
  }

  // 驗證最小日期（1900/1/31 之前的日期不支援）
  // Validate minimum date (dates before 1900/1/31 are not supported)
  if (year === MIN_YEAR && month === 1 && day < 31) {
    return null;
  }

  // 計算從基準日期到目標日期的天數差
  // Calculate days difference from base date to target date
  const baseDate = Date.UTC(MIN_YEAR, 0, 31); // 1900/1/31
  const targetDate = Date.UTC(year, month - 1, day);
  let remainingDays = (targetDate - baseDate) / 86400000;

  // === 步驟 1: 確定農曆年份 ===
  // === Step 1: Determine lunar year ===
  let lunarYear = MIN_YEAR;
  let yearDays = 0;

  // 持續減去每年的天數，直到 remainingDays 變成負數
  // Keep subtracting year days until remainingDays becomes negative
  while (lunarYear < MAX_YEAR && remainingDays > 0) {
    yearDays = getLunarYearDays(lunarYear);
    remainingDays -= yearDays;
    lunarYear++;
  }

  // 如果減過頭（變成負數），回退一年並補回天數
  // If we subtracted too much (went negative), roll back one year
  if (remainingDays < 0) {
    remainingDays += yearDays;
    lunarYear--;
  }

  // === 步驟 2: 確定農曆月份 ===
  // === Step 2: Determine lunar month ===
  const leapMonth = getLeapMonth(lunarYear);
  let lunarMonth = 1;
  let isLeapMonth = false;
  let monthDays = 0;

  while (lunarMonth <= 12 && remainingDays > 0) {
    // 處理閏月
    // Handle leap month
    if (leapMonth > 0 && lunarMonth === leapMonth + 1 && !isLeapMonth) {
      // 進入閏月
      // Enter leap month
      lunarMonth--;
      isLeapMonth = true;
      monthDays = getLeapMonthDays(lunarYear);
    } else {
      // 普通月份
      // Regular month
      monthDays = getMonthDays(lunarYear, lunarMonth);
    }

    remainingDays -= monthDays;

    // 閏月處理完畢，標記清除
    // Clear leap month flag after processing
    if (isLeapMonth && lunarMonth === leapMonth + 1) {
      isLeapMonth = false;
    }

    lunarMonth++;
  }

  // === 步驟 3: 處理邊界情況 ===
  // === Step 3: Handle edge cases ===
  if (remainingDays === 0 && leapMonth > 0 && lunarMonth === leapMonth + 1) {
    if (isLeapMonth) {
      isLeapMonth = false;
    } else {
      isLeapMonth = true;
      lunarMonth--;
    }
  }

  if (remainingDays < 0) {
    remainingDays += monthDays;
    lunarMonth--;
  }

  // === 步驟 4: 計算農曆日 ===
  // === Step 4: Calculate lunar day ===
  const lunarDay = remainingDays + 1;

  return {
    lYear: lunarYear,
    lMonth: lunarMonth,
    lDay: lunarDay,
  };
}