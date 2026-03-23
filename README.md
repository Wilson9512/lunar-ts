# lunar-ts 🌙

> A highly-optimized, zero-dependency, and fluent Chinese Lunar Calendar converter.

[![npm version](https://img.shields.io/npm/v/lunar-ts.svg)](https://www.npmjs.com/package/lunar-ts)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/lunar-ts)](https://bundlephobia.com/package/lunar-ts)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**lunar-ts** is designed for modern web applications. It strips away the bloat, replaces $O(N)$ calculations with $O(1)$ constant-time prefix-sums, and uses lazy evaluation to give you exactly what you need with zero overhead.

* **Nano Size:** **~3KB** (minified & gzipped). No `dayjs`, no heavy dependencies.
* **Blazing Fast:** $O(1)$ algorithm using precomputed prefix sums and binary search.
* **Fluent API:** Clean, lazy-evaluated getter properties. Calculate only when accessed.
* **Type-Safe:** First-class TypeScript support.

## Installation

```bash
npm install lunar-ts
# or pnpm install lunar-ts
# or yarn add lunar-ts
```

## Quick Start (New Fluent API)

The easiest and most efficient way to use `lunar-ts` is via the unified factory function.

```typescript
import { lunar } from 'lunar-ts';

// Accepts Date object, timestamp, or string
const date = lunar(new Date()); 

// Core Lunar Date (Immediate Calculation)
console.log(date.year);    // 2024
console.log(date.month);   // 1
console.log(date.day);     // 1
console.log(date.isLeap);  // false

// Lazy Evaluation properties (Computed ONLY when accessed)
console.log(date.zodiac);       // 'dragon'
console.log(date.ganzhi.year);  // '甲辰'
console.log(date.term);         // '立春' (or null if not a solar term)
```

## Legacy / Modular API

If you prefer the functional approach or want extreme tree-shaking, you can import individual utilities:

```typescript
import { toLunar, getZodiac, getTerm, getAllTerms } from 'lunar-ts';

const ts = Date.now();

// 1. Gregorian → Lunar
const result = toLunar(ts);
// { lYear: 2024, lMonth: 1, lDay: 1, isLeap: false }

// 2. Get Zodiac Animal
const zodiac = getZodiac(ts); // 'dragon'

// 3. Get Solar Term
const term = getTerm(ts); // '立春' or null

// 4. Get all 24 solar terms for a specific year
const terms = getAllTerms(ts);
// [{ name: '小寒', month: 1, day: 5 }, ...]
```

## Why lunar-ts?

There are many lunar calendar libraries out there, but most are bloated with fortune-telling algorithms, festival hardcodings, and heavy timezone dependencies like `moment` or `dayjs`.

**lunar-ts** takes a different approach:
1. **Zero Dependencies:** Replaced `dayjs` with an internal native `UTC+8` Beijing time converter.
2. **Compressed Data Tables:** Solar term arrays are serialized into flat hexadecimal strings, sliced optimally in memory.
3. **Prefix-Sum Indexing:** Replaced standard `while` loops for year-day deductions with an $O(1)$ lookup table + binary search, guaranteeing consistent microsecond execution times.

If you are building a dashboard, a sleek date-picker, or just need raw calendar conversion without the architectural bloat—this is for you.

## Constraints & Scope

- **Timezone:** Fixed to `UTC+8` (Beijing Time), which is standard for Chinese lunar logic.
- **Range:** Supports years **1900 - 2100**.
- **Scope:** Provides basic dates, zodiacs, and 24 solar terms. Does *not* include festival text mappings or Bazi/Feng-shui calculations.

## Data Sources
Lunar calendar data encoding is based on [solarlunar](https://github.com/yize/solarlunar).

## License
ISC License © Wilson