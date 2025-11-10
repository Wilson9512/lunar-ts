/**
 * 天干
 * Heavenly stems
 */
export const HEAVENLY_STEMS = '甲乙丙丁戊己庚辛壬癸' as const;

/**
 * 地支
 * Earthly branches
 */
export const EARTHLY_BRANCHES = '子丑寅卯辰巳午未申酉戌亥' as const;

/**
 * 干支計算的基準年（甲子年）
 * Reference year for GanZhi calculation (Jiazi year)
 */
export const GZ_BASE_YEAR = 1984;

/**
 * 干支周期
 * GanZhi cycle
 */
export const GZ_CYCLE = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥',
] as const;