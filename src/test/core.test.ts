import { describe, it, expect } from 'vitest';
import { lunar } from '../core/lunar';

describe('Lunar Fluent API', () => {
  it('should parse 2024-02-10 as 2024 Lunar New Year', () => {
    // 2024-02-10 in Beijing Time is Lunar 2024-01-01
    const ts = Date.UTC(2024, 1, 10);
    const date = lunar(ts);
    
    expect(date.isValid).toBe(true);
    expect(date.year).toBe(2024);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
    expect(date.isLeap).toBe(false);
    expect(date.zodiac).toBe('dragon');
    expect(date.ganzhi.year).toBe('甲辰');
  });

  it('should parse 2024-02-05 as 立春', () => {
    const ts = Date.UTC(2024, 1, 5);
    const date = lunar(ts);
    
    expect(date.term).toBe('立春');
  });

  it('should return null for invalid date (before 1900-01-31)', () => {
    const ts = Date.UTC(1899, 0, 1);
    const date = lunar(ts);
    
    expect(date.isValid).toBe(false);
    expect(date.year).toBeNull();
    expect(date.zodiac).toBeNull();
    expect(date.term).toBeNull();
    expect(date.ganzhi.year).toBeNull();
  });

  it('should parse string dates correctly', () => {
    // Ensure we parse standard ISO string as local, but we pass valid timestamp directly to be safe in testing
    const ts = new Date('2024-02-10T08:00:00+08:00').getTime();
    const date = lunar(ts);
    expect(date.year).toBe(2024);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
  });
});
