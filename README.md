[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md)

# lunar-ts 🌙

> A highly-optimized, zero-dependency, and fluent Chinese Lunar Calendar converter.

[![npm version](https://img.shields.io/npm/v/lunar-ts.svg)](https://www.npmjs.com/package/lunar-ts)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/lunar-ts)](https://bundlephobia.com/package/lunar-ts)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**lunar-ts** is designed for modern web applications. It strips away the bloat, replaces $O(N)$ calculations with $O(1)$ constant-time prefix-sums, and uses lazy evaluation to give you exactly what you need with zero overhead.

- 📦 **Nano Size:** ~3 KB (minified & gzipped). No `dayjs`, no heavy dependencies.
- ⚡ **Blazing Fast:** $O(1)$ algorithm using precomputed prefix sums and binary search.
- 🔗 **Fluent API:** Clean, lazy-evaluated getter properties. Calculate only when accessed.
- 🛡️ **Type-Safe:** First-class TypeScript support.

## Installation

```bash
npm install lunar-ts
# or  pnpm add lunar-ts
# or  yarn add lunar-ts
```

## Quick Start — Fluent API

The easiest and most efficient way to use `lunar-ts` is via the unified factory function.

```typescript
import { lunar } from 'lunar-ts';

// Accepts Date object, timestamp, or string
const date = lunar(new Date());

// Core Lunar Date (calculated immediately)
console.log(date.year);    // 2024
console.log(date.month);   // 1
console.log(date.day);     // 1
console.log(date.isLeap);  // false

// Lazy properties — computed ONLY when accessed
console.log(date.zodiac);        // 'dragon'
console.log(date.ganzhi.year);   // '甲辰'
console.log(date.term);          // '立春' (or null if not a solar term)
```

## Legacy / Modular API

If you prefer the functional approach or want extreme tree-shaking, import individual utilities:

```typescript
import { toLunar, getZodiac, getTerm, getAllTerms } from 'lunar-ts';

const now = Date.now();

// 1. Gregorian → Lunar
const result = toLunar(now);
// { lYear: 2024, lMonth: 1, lDay: 1, isLeap: false }

// 2. Get Zodiac Animal
const zodiac = getZodiac(now); // 'dragon'

// 3. Get Solar Term
const term = getTerm(now); // '立春' or null

// 4. Get all 24 solar terms for a year
const terms = getAllTerms(now);
// [{ name: '小寒', month: 1, day: 5 }, ...]
```

## Why lunar-ts?

There are many lunar calendar libraries out there, but most are bloated with fortune-telling algorithms, festival hardcodings, and heavy timezone dependencies like `moment` or `dayjs`.

**lunar-ts** takes a different approach:

1. **Zero Dependencies:** Replaced `dayjs` with an internal native `UTC+8` Beijing time converter.
2. **Compressed Data Tables:** Solar term arrays are serialized into flat hexadecimal strings, sliced optimally in memory.
3. **Prefix-Sum Indexing:** Replaced standard loops with an $O(1)$ lookup table + binary search, guaranteeing consistent microsecond execution times.

## Constraints & Scope

| | |
|---|---|
| **Timezone** | Fixed to `UTC+8` (Beijing Time) |
| **Range** | Years **1900 – 2100** |
| **Scope** | Basic dates, zodiacs, 24 solar terms. No festival text or Bazi/Feng-shui. |

## Data Sources

Lunar calendar data encoding is based on [solarlunar](https://github.com/yize/solarlunar).

## License

ISC License © Wilson
