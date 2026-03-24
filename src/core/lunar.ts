import { toLunar } from '../lunar';
import { getZodiac } from '../zodiac';
import { getGZ } from '../ganzhi';
import { getTerm } from '../term';
import type { ZodiacAnimal, GZ, TermName, LunarDate } from '../types';

export class Lunar {
  private timestamp: number;
  private _lunar: LunarDate | null;
  // ganzhi 物件快取，避免每次存取 .ganzhi 都重新建立物件
  private _ganzhiCache: { readonly year: GZ | null } | null = null;

  constructor(date: Date | number | string = new Date()) {
    if (date instanceof Date) {
      this.timestamp = date.getTime();
    } else if (typeof date === 'string') {
      // new Date('invalid').getTime() 會回傳 NaN，toLunar 會安全處理並回傳 null
      this.timestamp = new Date(date).getTime();
    } else {
      this.timestamp = date;
    }
    this._lunar = toLunar(this.timestamp);
  }

  get isValid(): boolean {
    return this._lunar !== null;
  }

  get year(): number | null {
    return this._lunar ? this._lunar.lYear : null;
  }

  get month(): number | null {
    return this._lunar ? this._lunar.lMonth : null;
  }

  get day(): number | null {
    return this._lunar ? this._lunar.lDay : null;
  }

  get isLeap(): boolean {
    return this._lunar ? !!this._lunar.isLeap : false;
  }

  get zodiac(): ZodiacAnimal | null {
    return this._lunar ? getZodiac(this.timestamp) : null;
  }

  get ganzhi(): { readonly year: GZ | null } {
    // 首次存取時才計算並快取，後續直接回傳同一物件，避免重複 allocate
    if (!this._ganzhiCache) {
      this._ganzhiCache = { year: this.isValid ? getGZ(this.timestamp) : null };
    }
    return this._ganzhiCache;
  }

  get term(): TermName | null {
    return this._lunar ? getTerm(this.timestamp) : null;
  }
}

/**
 * 創建一個農曆日期實例 (流暢且具備 Lazy Evaluation 的 API)
 * Create a lunar date instance with fluent and lazy evaluation API
 * 
 * @param date 可以是 Date 物件、時間戳 (number) 或日期字串 (string)
 */
export function lunar(date?: Date | number | string): Lunar {
  return new Lunar(date);
}
