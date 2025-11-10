import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TERMS_TABLE, MIN_YEAR, MAX_YEAR, TERMS_NAMES, type TermName } from './constants';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 解析節氣數據字符串，獲取某年某個節氣的日期
 * Parse solar term data string to get the date of a specific solar term in a year
 *
 * 資料格式解析邏輯 / Data format parsing logic:
 * The hex-encoded data format is decoded to extract solar term dates.
 * This is a standard data decoding implementation based on the data structure.
 *
 * @param year - 公曆年份 / Gregorian year (1900-2100)
 * @param termIndex - 節氣索引 (0-23) / Solar term index (0-23)
 * @returns 該節氣的日期 (1-31)，如果無效則返回 null / Date of the solar term (1-31), or null if invalid
 */
function getTermDay(year: number, termIndex: number): number | null {
  if (year < MIN_YEAR || year > MAX_YEAR) {
    return null;
  }
  if (termIndex < 0 || termIndex >= 24) {
    return null;
  }

  const table = TERMS_TABLE[year - MIN_YEAR];
  if (!table) return null;

  // 將30字符的十六進制字符串分成6組，每組5個字符
  // Split 30-char hex string into 6 groups of 5 chars each
  const info = [
    parseInt('0x' + table.slice(0, 5)).toString(),
    parseInt('0x' + table.slice(5, 10)).toString(),
    parseInt('0x' + table.slice(10, 15)).toString(),
    parseInt('0x' + table.slice(15, 20)).toString(),
    parseInt('0x' + table.slice(20, 25)).toString(),
    parseInt('0x' + table.slice(25, 30)).toString()
  ];

  // 每組字符串包含4個節氣的日期信息
  // Each group contains date info for 4 solar terms
  // 格式：1位 + 2位 + 1位 + 2位 = 6個字符
  // Format: 1 digit + 2 digits + 1 digit + 2 digits = 6 chars
  const calDay = [
    info[0].slice(0, 1),
    info[0].slice(1, 3),
    info[0].slice(3, 4),
    info[0].slice(4, 6),

    info[1].slice(0, 1),
    info[1].slice(1, 3),
    info[1].slice(3, 4),
    info[1].slice(4, 6),

    info[2].slice(0, 1),
    info[2].slice(1, 3),
    info[2].slice(3, 4),
    info[2].slice(4, 6),

    info[3].slice(0, 1),
    info[3].slice(1, 3),
    info[3].slice(3, 4),
    info[3].slice(4, 6),

    info[4].slice(0, 1),
    info[4].slice(1, 3),
    info[4].slice(3, 4),
    info[4].slice(4, 6),

    info[5].slice(0, 1),
    info[5].slice(1, 3),
    info[5].slice(3, 4),
    info[5].slice(4, 6)
  ];

  return parseInt(calDay[termIndex]);
}

/**
 * 獲取某年某個節氣的月份
 * Get the month of a specific solar term in a year
 *
 * @param termIndex - 節氣索引 (0-23) / Solar term index (0-23)
 * @returns 月份 (1-12) / Month (1-12)
 */
function getSolarTermMonth(termIndex: number): number {
  // 節氣月份對應表：每兩個節氣對應一個月
  // Solar term month mapping: every two terms correspond to one month
  // 小寒、大寒 -> 1月; 立春、雨水 -> 2月; ...
  return Math.floor(termIndex / 2) + 1;
}

/**
 * 檢查指定公曆日期是否為24節氣
 * Check if a Gregorian date is one of the 24 solar terms
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 節氣名稱，若不是節氣則返回 null / Solar term name, or null if not a solar term
 */
export function getTerm(timestamp: number): TermName | null {
  const beijing = dayjs(timestamp).tz('Asia/Shanghai');

  const year = beijing.year();
  const month = beijing.month() + 1;
  const day = beijing.date();

  if (year < MIN_YEAR || year > MAX_YEAR) {
    return null;
  }

  // 檢查每個節氣
  // Check each solar term
  for (let i = 0; i < 24; i++) {
    const termMonth = getSolarTermMonth(i);

    // 只檢查當前月份的節氣
    // Only check solar terms in the current month
    if (termMonth === month) {
      const termDay = getTermDay(year, i);
      if (termDay === day) {
        return TERMS_NAMES[i];
      }
    }
  }

  return null;
}

/**
 * 獲取某年所有24節氣的日期
 * Get all 24 solar term dates in a year
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns 24個節氣的日期數組，每項包含節氣名稱、月份和日期 / Array of 24 solar term dates
 */
export function getAllTerms(timestamp: number): Array<{
  name: TermName;
  month: number;
  day: number;
}> | null {
  const beijing = dayjs(timestamp).tz('Asia/Shanghai');
  const year = beijing.year();

  if (year < MIN_YEAR || year > MAX_YEAR) {
    return null;
  }

  const result: Array<{
    name: TermName;
    month: number;
    day: number;
  }> = [];

  for (let i = 0; i < 24; i++) {
    const day = getTermDay(year, i);
    if (day === null) {
      return null;
    }
    result.push({
      name: TERMS_NAMES[i],
      month: getSolarTermMonth(i),
      day,
    });
  }

  return result;
}
