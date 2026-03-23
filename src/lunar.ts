import { LUNAR_CALENDAR, MIN_YEAR, MAX_YEAR } from './constants';
import type { LunarDate } from './types';
import { getBeijingDate } from './utils/date';

// 預先計算每年總天數，將時間複雜度降為 O(1)
const LUNAR_YEAR_DAYS = new Uint16Array(MAX_YEAR - MIN_YEAR + 1);
const LUNAR_YEAR_PREFIX_SUM = new Uint32Array(MAX_YEAR - MIN_YEAR + 2);

function initLunarCache() {
  let sum = 0;
  for (let i = 0; i <= MAX_YEAR - MIN_YEAR; i++) {
    const data = LUNAR_CALENDAR[i];
    let days = 348;
    let temp = data & 0xfff0;
    while (temp) {
      days++;
      temp &= temp - 1;
    }
    const leapMonth = data & 0xf;
    if (leapMonth) {
      days += (data & 0x10000) ? 30 : 29;
    }
    LUNAR_YEAR_DAYS[i] = days;
    LUNAR_YEAR_PREFIX_SUM[i] = sum;
    sum += days;
  }
  LUNAR_YEAR_PREFIX_SUM[MAX_YEAR - MIN_YEAR + 1] = sum;
}
initLunarCache();

/**
 * 取得閏月天數
 */
function getLeapMonthDays(data: number): number {
  return (data & 0x10000) ? 30 : 29;
}

/**
 * 取得指定月份的天數
 */
function getMonthDays(data: number, month: number): number {
  return (data & (0x10000 >> month)) ? 30 : 29;
}

/**
 * 公曆轉農曆
 * Convert Gregorian date to Lunar date
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 農曆日期物件，若日期無效則返回 null
 */
export function toLunar(timestamp: number): LunarDate | null {
  const beijing = getBeijingDate(timestamp);
  
  const year = beijing.getUTCFullYear();
  const month = beijing.getUTCMonth() + 1;
  const day = beijing.getUTCDate();
  
  // 驗證年份範圍
  if (year < MIN_YEAR || year > MAX_YEAR) {
    return null;
  }

  // 驗證最小日期（1900/1/31 之前的日期不支援）
  if (year === MIN_YEAR && month === 1 && day < 31) {
    return null;
  }

  const baseDate = Date.UTC(MIN_YEAR, 0, 31); // 1900/1/31
  const targetDate = Date.UTC(year, month - 1, day);
  let remainingDays = Math.floor((targetDate - baseDate) / 86400000);

  // === 步驟 1: 確定農曆年份 (利用前綴和與二分搜尋法 O(1) ~ O(log N)) ===
  let low = 0;
  let high = MAX_YEAR - MIN_YEAR;
  let lunarYearIndex = 0;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (LUNAR_YEAR_PREFIX_SUM[mid] <= remainingDays) {
      lunarYearIndex = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  remainingDays -= LUNAR_YEAR_PREFIX_SUM[lunarYearIndex];
  const lunarYear = MIN_YEAR + lunarYearIndex;

  // === 步驟 2: 確定農曆月份 ===
  const data = LUNAR_CALENDAR[lunarYearIndex];
  const leapMonth = data & 0xf;
  let lunarMonth = 1;
  let isLeapMonth = false;
  let monthDays = 0;

  while (lunarMonth <= 12 && remainingDays > 0) {
    if (leapMonth > 0 && lunarMonth === leapMonth + 1 && !isLeapMonth) {
      lunarMonth--;
      isLeapMonth = true;
      monthDays = getLeapMonthDays(data);
    } else {
      monthDays = getMonthDays(data, lunarMonth);
    }

    remainingDays -= monthDays;

    if (isLeapMonth && lunarMonth === leapMonth + 1) {
      isLeapMonth = false;
    }

    lunarMonth++;
  }

  // === 步驟 3: 處理邊界情況 ===
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

  return {
    lYear: lunarYear,
    lMonth: lunarMonth,
    lDay: remainingDays + 1,
    isLeap: isLeapMonth
  };
}
