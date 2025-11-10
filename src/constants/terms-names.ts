/**
 * 24節氣名稱
 * 24 Solar Terms names
 *
 * 按照一年中的順序排列
 * Arranged in chronological order throughout the year
 */
export const TERMS_NAMES = [
  '小寒', '大寒', '立春', '雨水', '驚蟄', '春分',
  '清明', '穀雨', '立夏', '小滿', '芒種', '夏至',
  '小暑', '大暑', '立秋', '處暑', '白露', '秋分',
  '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'
] as const;

export type TermName = typeof TERMS_NAMES[number];
