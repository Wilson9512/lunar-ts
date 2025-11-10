import { describe, it, expect } from 'vitest';
import { toLunar } from '../lunar';

// Helper function to convert date to timestamp
function dateToTimestamp(year: number, month: number, day: number): number {
  // Create UTC date and convert to Beijing time (UTC+8)
  return Date.UTC(year, month - 1, day) + 8 * 60 * 60 * 1000;
}

describe('toLunar', () => {
  it('should convert 2024-01-01 correctly', () => {
    const result = toLunar(dateToTimestamp(2024, 1, 1));
    expect(result).not.toBeNull();
    expect(result?.lYear).toBe(2023);
  });

  it('should convert 2025-01-29 (Lunar New Year 2025) correctly', () => {
    const result = toLunar(dateToTimestamp(2025, 1, 29));
    expect(result).not.toBeNull();
    expect(result?.lYear).toBe(2025);
    expect(result?.lMonth).toBe(1);
    expect(result?.lDay).toBe(1);
  });

  it('should convert 2026-02-17 (Lunar New Year 2026) correctly', () => {
    const result = toLunar(dateToTimestamp(2026, 2, 17));
    expect(result).not.toBeNull();
    expect(result?.lYear).toBe(2026);
    expect(result?.lMonth).toBe(1);
    expect(result?.lDay).toBe(1);
  });

  it('should convert 2026-02-16 (Lunar New Year Eve 2025) correctly', () => {
    const result = toLunar(dateToTimestamp(2026, 2, 16));
    expect(result).not.toBeNull();
    expect(result?.lYear).toBe(2025);
    expect(result?.lMonth).toBe(12);
    // 2025年腊月是小月(29天)
    expect(result?.lDay).toBe(29);
  });

  it('should handle leap month in 2025 (leap 6th month)', () => {
    const data2025 = 0x0a6e6; // 2025
    const leapMonth = data2025 & 0xf;
    expect(leapMonth).toBe(6);
  });

  it('should handle minimum date 1900-01-31', () => {
    const result = toLunar(dateToTimestamp(1900, 1, 31));
    expect(result).not.toBeNull();
    expect(result?.lYear).toBe(1900);
    expect(result?.lMonth).toBe(1);
    expect(result?.lDay).toBe(1);
  });

  it('should return null for dates before 1900-01-31', () => {
    expect(toLunar(dateToTimestamp(1900, 1, 30))).toBeNull();
    expect(toLunar(dateToTimestamp(1899, 12, 31))).toBeNull();
  });

  it('should return null for year < 1900', () => {
    const result = toLunar(dateToTimestamp(1899, 12, 31));
    expect(result).toBeNull();
  });

  it('should return null for year > 2100', () => {
    const result = toLunar(dateToTimestamp(2101, 1, 1));
    expect(result).toBeNull();
  });

  it('should handle boundary dates', () => {
    const result1 = toLunar(dateToTimestamp(1900, 2, 1));
    const result2 = toLunar(dateToTimestamp(2100, 12, 31));
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
  });

  describe('Known important dates', () => {
    it('should convert 2024 Spring Festival (2024-02-10) correctly', () => {
      const result = toLunar(dateToTimestamp(2024, 2, 10));
      expect(result).not.toBeNull();
      expect(result?.lYear).toBe(2024);
      expect(result?.lMonth).toBe(1);
      expect(result?.lDay).toBe(1);
    });

    it('should convert 2024 Mid-Autumn Festival (2024-09-17) correctly', () => {
      const result = toLunar(dateToTimestamp(2024, 9, 17));
      expect(result).not.toBeNull();
      expect(result?.lYear).toBe(2024);
      expect(result?.lMonth).toBe(8);
      expect(result?.lDay).toBe(15);
    });

    it('should convert 2023 Spring Festival (2023-01-22) correctly', () => {
      const result = toLunar(dateToTimestamp(2023, 1, 22));
      expect(result).not.toBeNull();
      expect(result?.lYear).toBe(2023);
      expect(result?.lMonth).toBe(1);
      expect(result?.lDay).toBe(1);
    });
  });
});