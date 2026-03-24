[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md)

# lunar-ts 🌙

> 高性能、零依赖、流畅的农历日期转换函数库。

[![npm version](https://img.shields.io/npm/v/lunar-ts.svg)](https://www.npmjs.com/package/lunar-ts)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/lunar-ts)](https://bundlephobia.com/package/lunar-ts)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**lunar-ts** 专为现代 Web 应用设计。摒弃冗余依赖，将 $O(N)$ 计算替换为 $O(1)$ 常数时间前缀和查表，并采用惰性求值（lazy evaluation），让你只在需要时才进行计算，零额外开销。

- 📦 **超小体积：** 压缩后仅约 3 KB，不依赖 `dayjs` 等第三方包。
- ⚡ **极速运算：** $O(1)$ 前缀和查表 + 二分搜索，微秒级稳定执行。
- 🔗 **流畅 API：** 惰性求值的 getter 属性，只在访问时才计算。
- 🛡️ **类型安全：** 完整 TypeScript 类型支持。

## 安装

```bash
npm install lunar-ts
# 或  pnpm add lunar-ts
# 或  yarn add lunar-ts
```

## 快速开始 — 流畅 API

使用统一的工厂函数是最简单也最高效的方式。

```typescript
import { lunar } from 'lunar-ts';

// 接受 Date 对象、时间戳或字符串
const date = lunar(new Date());

// 农历核心数据（立即计算）
console.log(date.year);    // 2024
console.log(date.month);   // 1
console.log(date.day);     // 1
console.log(date.isLeap);  // false

// 惰性属性 — 访问时才计算
console.log(date.zodiac);        // 'dragon'
console.log(date.ganzhi.year);   // '甲辰'
console.log(date.term);          // '立春'（非节气则为 null）
```

## 传统 / 模块化 API

若偏好函数式风格或需要更极致的 tree-shaking，可单独引入各工具函数：

```typescript
import { toLunar, getZodiac, getTerm, getAllTerms } from 'lunar-ts';

const now = Date.now();

// 1. 公历 → 农历
const result = toLunar(now);
// { lYear: 2024, lMonth: 1, lDay: 1, isLeap: false }

// 2. 获取生肖
const zodiac = getZodiac(now); // 'dragon'

// 3. 获取节气
const term = getTerm(now); // '立春' 或 null

// 4. 获取某年全部 24 节气
const terms = getAllTerms(now);
// [{ name: '小寒', month: 1, day: 5 }, ...]
```

## 为什么选择 lunar-ts？

市面上有许多农历函数库，但大多数都充斥着算命算法、节日硬编码，以及对 `moment`、`dayjs` 等包的重度依赖。

**lunar-ts** 采取截然不同的策略：

1. **零依赖：** 以内置的原生 `UTC+8` 北京时间转换器替代 `dayjs`。
2. **压缩数据表：** 节气数组序列化为十六进制字符串，在内存中以最优方式切片。
3. **前缀和索引：** 以 $O(1)$ 查表 + 二分搜索取代传统循环，确保微秒级稳定执行时间。

## 限制与适用范围

| | |
|---|---|
| **时区** | 固定使用 `UTC+8`（北京时间） |
| **年份范围** | **1900 – 2100** 年 |
| **功能范围** | 基本日期转换、生肖与 24 节气，不含节日文字映射或八字/风水计算 |

## 数据来源

农历数据编码基于 [solarlunar](https://github.com/yize/solarlunar)。

## 许可证

ISC License © Wilson
