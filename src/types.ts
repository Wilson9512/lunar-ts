import { GZ_CYCLE, TERMS_NAMES, ZODIAC_MAP } from "./constants";

export type ZodiacAnimal = (typeof ZODIAC_MAP)[keyof typeof ZODIAC_MAP];

export type GZ = (typeof GZ_CYCLE)[number];

export type TermName = typeof TERMS_NAMES[number];

export interface LunarDate {
  lYear: number;
  lMonth: number;
  lDay: number;
}