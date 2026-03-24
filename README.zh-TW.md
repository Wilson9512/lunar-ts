[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md)

# lunar-ts 🌙

> 高效能、零依賴、流暢的農曆日期轉換函式庫。

[![npm version](https://img.shields.io/npm/v/lunar-ts.svg)](https://www.npmjs.com/package/lunar-ts)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/lunar-ts)](https://bundlephobia.com/package/lunar-ts)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**lunar-ts** 專為現代 Web 應用程式設計。捨棄冗餘依賴，將 $O(N)$ 計算替換為 $O(1)$ 常數時間前綴和查表，並採用惰性求值（lazy evaluation），讓你只在需要時才進行計算，零額外開銷。

- 📦 **超小體積：** 壓縮後僅約 3 KB，不依賴 `dayjs` 等第三方套件。
- ⚡ **極速運算：** $O(1)$ 前綴和查表 + 二元搜尋，毫秒以下穩定執行。
- 🔗 **流暢 API：** 惰性求值的 getter 屬性，只在存取時才計算。
- 🛡️ **型別安全：** 完整 TypeScript 型別支援。

## 安裝

```bash
npm install lunar-ts
# 或  pnpm add lunar-ts
# 或  yarn add lunar-ts
```

## 快速開始 — 流暢 API

使用統一的工廠函式是最簡單也最高效的方式。

```typescript
import { lunar } from 'lunar-ts';

// 接受 Date 物件、時間戳記或字串
const date = lunar(new Date());

// 農曆核心資料（立即計算）
console.log(date.year);    // 2024
console.log(date.month);   // 1
console.log(date.day);     // 1
console.log(date.isLeap);  // false

// 惰性屬性 — 存取時才計算
console.log(date.zodiac);        // 'dragon'
console.log(date.ganzhi.year);   // '甲辰'
console.log(date.term);          // '立春'（非節氣則為 null）
```

## 傳統 / 模組化 API

若偏好函式式風格或需要更極致的 tree-shaking，可單獨引入各工具函式：

```typescript
import { toLunar, getZodiac, getTerm, getAllTerms } from 'lunar-ts';

const now = Date.now();

// 1. 國曆 → 農曆
const result = toLunar(now);
// { lYear: 2024, lMonth: 1, lDay: 1, isLeap: false }

// 2. 取得生肖
const zodiac = getZodiac(now); // 'dragon'

// 3. 取得節氣
const term = getTerm(now); // '立春' 或 null

// 4. 取得某年全部 24 節氣
const terms = getAllTerms(now);
// [{ name: '小寒', month: 1, day: 5 }, ...]
```

## 為什麼選擇 lunar-ts？

市面上有許多農曆函式庫，但大多數都充斥著算命演算法、節日硬編碼，以及對 `moment`、`dayjs` 等套件的重度依賴。

**lunar-ts** 採取截然不同的策略：

1. **零依賴：** 以內建的原生 `UTC+8` 北京時間轉換器取代 `dayjs`。
2. **壓縮資料表：** 節氣陣列序列化為十六進位字串，在記憶體中以最優方式切片。
3. **前綴和索引：** 以 $O(1)$ 查表 + 二元搜尋取代傳統迴圈，確保毫秒以下的穩定執行時間。

## 限制與適用範圍

| | |
|---|---|
| **時區** | 固定使用 `UTC+8`（北京時間） |
| **年份範圍** | **1900 – 2100** 年 |
| **功能範圍** | 基本日期轉換、生肖與 24 節氣，不含節日文字對照或八字/風水計算 |

## 資料來源

農曆資料編碼基於 [solarlunar](https://github.com/yize/solarlunar)。

## 授權

ISC License © Wilson
