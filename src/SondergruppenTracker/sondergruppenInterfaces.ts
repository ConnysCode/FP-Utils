export interface GeburtstagLaserTag {
    id:number;
  name: string;
  type:groupsType;
  players: number;
  softdrinks: softdrinksType[];
  softdrinkLimit:number;
  sweets: boolean;
}

export const groups = [`LT Geburtsag x2`, `LT Geburtsag x3`, `LT Geburtsag x4`] as const;
export type groupsType = typeof groups[number];

export const softdrinks = [
  `COLA`,
  `COLA-ZERO`,
  `ORANGE`,
  `ZITRONE`,
  `EISTEE`,
  `WASSER`,
  `WASSER-SPRUDEL`,
] as const;
export type softdrinksType = typeof softdrinks[number];
