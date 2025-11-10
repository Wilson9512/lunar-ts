# lunar-ts

> Tiny, fast, focused Chinese Lunar Calendar converter. Just what you need, nothing more.

## Why lunar-ts?

**lunar-ts is different:**

- **Tiny** - Minimal bundle size, only essential code
- **Fast** - Simple API, no learning curve
- **Focused** - Does 3 things really well:
  - ✅ Convert Gregorian → Lunar dates
  - ✅ Get Chinese zodiac (生肖)
  - ✅ Get solar terms (節氣)

## Installation

```bash
npm install lunar-ts
```

## Quick Start

```typescript
import { toLunar, getZodiac, getTerm } from 'lunar-ts';

// Convert to lunar date
const lunar = toLunar(Date.now());
console.log(lunar);
// { lYear: 2025, lMonth: 1, lDay: 13 }

// Get zodiac animal
const zodiac = getZodiac(Date.now());
console.log(zodiac); // 'snake'

// Check if today is a solar term
const term = getTerm(Date.now());
console.log(term); // '立春' or null
```

## That's All You Need

### Convert Gregorian → Lunar

```typescript
const lunar = toLunar(new Date('2025-02-10').getTime());
// { year: 2025, month: 1, day: 13 }
```

### Get Zodiac

```typescript
const zodiac = getZodiac(new Date('2025-01-01').getTime());
// 'snake' (Snake for 2025)
```

### Check Solar Terms

```typescript
// Check if a specific date is a solar term
const term = getTerm(new Date('2025-02-03').getTime());
// '立春' or null

// Get all 24 solar terms for the year
const allTerms = getAllTerms(new Date('2025-01-01').getTime());
// [
//   { name: '小寒', month: 1, day: 5 },
//   { name: '大寒', month: 1, day: 20 },
//   ...
// ]
```

## Philosophy

**Do one thing well.** If you need:
- Just lunar dates, zodiac, and solar terms → Use lunar-ts
- Complex calendar calculations, festivals, fortune telling → Use other libraries

We believe in giving you building blocks, not a cathedral. Compose your own solution.

## Features

- ✅ TypeScript support with full type definitions
- ✅ Support years 1900-2100
- ✅ Tree-shakeable ESM and CommonJS
- ✅ Zero dependencies (except dayjs for timezone handling)
- ✅ ISC License

## API

### `toLunar(timestamp: number)`

Convert Gregorian date to lunar date.

**Parameters:**
- `timestamp` (number): Unix timestamp in milliseconds

**Returns:** `LunarDate` object with `lYear`, `lMonth`, `lDay`

### `getZodiac(timestamp: number)`

Get Chinese zodiac animal for the year.

**Parameters:**
- `timestamp` (number): Unix timestamp in milliseconds

**Returns:** One of: "rat", "ox", "tiger" ,"rabbit" ,"dragon" ,"snake" ,"horse" ,"goat" ,"monkey" ,"rooster" ,"dog" ,"pig"

### `getTerm(timestamp: number)`

Check if the date is one of the 24 solar terms.

**Parameters:**
- `timestamp` (number): Unix timestamp in milliseconds

**Returns:** Term name (e.g., `'立春'`) or `null`

### `getAllTerms(timestamp: number)`

Get all 24 solar terms for the year.

**Parameters:**
- `timestamp` (number): Unix timestamp in milliseconds

**Returns:** Array of `{ name, month, day }` objects

## When NOT to use lunar-ts

- You need festival dates (清明, 端午, etc.) → This only gives you raw dates
- You need fortune telling (八字, 五行) → This only gives you zodiac and ganzhi
- You need detailed calendar rules → This gives you data, you build the logic

## Timezone Handling

All conversions use Beijing timezone (Asia/Shanghai) by default, which is standard for Chinese lunar calendar calculations.

## Data Sources

Lunar calendar data (1900-2100) is based on [solarlunar](https://github.com/yize/solarlunar) (ISC License).

## License

ISC License - See [LICENSE](./LICENSE) file for details.

## Contributing

Found a bug? Have a feature request? Open an issue on [GitHub](https://github.com/Wilson9512/lunar-ts/issues).

---
