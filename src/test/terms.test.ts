import { describe, it, expect } from 'vitest';
import { getTerm, getAllTerms } from '../term';

// Helper function to convert date to timestamp
function dateToTimestamp(year: number, month: number, day: number): number {
  // Create UTC date and convert to Beijing time (UTC+8)
  return Date.UTC(year, month - 1, day) + 8 * 60 * 60 * 1000;
}

describe('getTerm', () => {
  // 2024 term
  describe('Known solar terms in 2024', () => {
    it('should return 小寒 for 2024-01-07', () => {
      expect(getTerm(dateToTimestamp(2024, 1, 7))).toBe('小寒');
    });

    it('should return 大寒 for 2024-01-21', () => {
      expect(getTerm(dateToTimestamp(2024, 1, 21))).toBe('大寒');
    });

    it('should return 立春 for 2024-02-05', () => {
      expect(getTerm(dateToTimestamp(2024, 2, 5))).toBe('立春');
    });

    it('should return 雨水 for 2024-02-20', () => {
      expect(getTerm(dateToTimestamp(2024, 2, 20))).toBe('雨水');
    });

    it('should return 春分 for 2024-03-21', () => {
      expect(getTerm(dateToTimestamp(2024, 3, 21))).toBe('春分');
    });

    it('should return 清明 for 2024-04-05', () => {
      expect(getTerm(dateToTimestamp(2024, 4, 5))).toBe('清明');
    });

    it('should return 夏至 for 2024-06-22', () => {
      expect(getTerm(dateToTimestamp(2024, 6, 22))).toBe('夏至');
    });

    it('should return 秋分 for 2024-09-23', () => {
      expect(getTerm(dateToTimestamp(2024, 9, 23))).toBe('秋分');
    });

    it('should return 冬至 for 2024-12-22', () => {
      expect(getTerm(dateToTimestamp(2024, 12, 22))).toBe('冬至');
    });
  });

  // 2025 term
  describe('Known solar terms in 2025', () => {
    it('should return 小寒 for 2025-01-06', () => {
      expect(getTerm(dateToTimestamp(2025, 1, 6))).toBe('小寒');
    });

    it('should return 立春 for 2025-02-04', () => {
      expect(getTerm(dateToTimestamp(2025, 2, 4))).toBe('立春');
    });

    it('should return 春分 for 2025-03-21', () => {
      expect(getTerm(dateToTimestamp(2025, 3, 21))).toBe('春分');
    });

    it('should return 夏至 for 2025-06-22', () => {
      expect(getTerm(dateToTimestamp(2025, 6, 22))).toBe('夏至');
    });

    it('should return 秋分 for 2025-09-24', () => {
      expect(getTerm(dateToTimestamp(2025, 9, 24))).toBe('秋分');
    });

    it('should return 冬至 for 2025-12-22', () => {
      expect(getTerm(dateToTimestamp(2025, 12, 22))).toBe('冬至');
    });
  });

  // 測試非節氣日期
  describe('Non-solar term dates', () => {
    it('should return null for regular dates', () => {
      expect(getTerm(dateToTimestamp(2024, 1, 1))).toBeNull();
      expect(getTerm(dateToTimestamp(2024, 5, 15))).toBeNull();
      expect(getTerm(dateToTimestamp(2024, 10, 10))).toBeNull();
    });
  });

  // 測試邊界情況
  describe('Boundary cases', () => {
    it('should return null for year < 1900', () => {
      expect(getTerm(dateToTimestamp(1899, 1, 5))).toBeNull();
    });

    it('should return null for year > 2100', () => {
      expect(getTerm(dateToTimestamp(2101, 1, 5))).toBeNull();
    });

    it('should handle boundary years 1900 and 2100', () => {
      const result1900 = getTerm(dateToTimestamp(1900, 1, 6));
      const result2100 = getTerm(dateToTimestamp(2100, 12, 21));

      // These should either return a solar term name or null (not throw error)
      expect(result1900 === null || typeof result1900 === 'string').toBe(true);
      expect(result2100 === null || typeof result2100 === 'string').toBe(true);
    });
  });
});

describe('getAllTerms', () => {
  it('should return all 24 solar terms for 2024', () => {
    const terms = getAllTerms(dateToTimestamp(2024, 1, 1));

    expect(terms).not.toBeNull();
    expect(terms).toHaveLength(24);

    if (terms) {
      // 檢查第一個節氣（小寒）
      expect(terms[0].name).toBe('小寒');
      expect(terms[0].month).toBe(1);

      // 檢查最後一個節氣（冬至）
      expect(terms[23].name).toBe('冬至');
      expect(terms[23].month).toBe(12);

      // 檢查所有節氣都有有效的日期
      terms.forEach(term => {
        expect(term.day).toBeGreaterThan(0);
        expect(term.day).toBeLessThanOrEqual(31);
        expect(term.month).toBeGreaterThan(0);
        expect(term.month).toBeLessThanOrEqual(12);
      });
    }
  });

  it('should return all 24 solar terms for 2025', () => {
    const terms = getAllTerms(dateToTimestamp(2025, 1, 1));

    expect(terms).not.toBeNull();
    expect(terms).toHaveLength(24);
  });

  it('should return null for year < 1900', () => {
    expect(getAllTerms(dateToTimestamp(1899, 1, 1))).toBeNull();
  });

  it('should return null for year > 2100', () => {
    expect(getAllTerms(dateToTimestamp(2101, 1, 1))).toBeNull();
  });

  it('should have solar terms in chronological order', () => {
    const terms = getAllTerms(dateToTimestamp(2024, 1, 1));

    if (terms) {
      for (let i = 1; i < terms.length; i++) {
        const prev = terms[i - 1];
        const curr = terms[i];

        // 月份應該遞增或相等（每兩個節氣在同一個月）
        expect(curr.month).toBeGreaterThanOrEqual(prev.month);

        // 如果在同一個月，日期應該遞增
        if (curr.month === prev.month) {
          expect(curr.day).toBeGreaterThan(prev.day);
        }
      }
    }
  });

  it('should match getTerm results', () => {
    const year = 2024;
    const allTerms = getAllTerms(dateToTimestamp(year, 1, 1));

    if (allTerms) {
      allTerms.forEach(term => {
        const result = getTerm(dateToTimestamp(year, term.month, term.day));
        expect(result).toBe(term.name);
      });
    }
  });
});
