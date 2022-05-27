export interface sondergruppeInterface {
  id: number;
  name: string;
  players: number;
  bookingConfig: bookingTypeInterface;
  softdrinks: { drink: softdrinksType; revieved: boolean }[];
  beer: { drink: softdrinksType; revieved: boolean }[];
  nachos: boolean;
  sweets: boolean;
}

export const bookingTypes: { [key: string]: bookingTypeInterface } = {
  "Test": {
    typeName: "Text Modus",
    game: "All",
    colorCode: "#f0f0f0",
    softdrinkPerPlayer: 2,
    beerPerPlayer: 1,
    sweets: true,
    nachos: true,
  },
  "LT Geburtstag x2 (S)": {
    typeName: "LT Kindergeburtstag x2",
    game: "Lasertag",
    colorCode: "#3fbf3f",
    softdrinkPerPlayer: 1,
    beerPerPlayer: 0,
    sweets: true,
    nachos: false,
  },
  "LT Geburtstag x3 (M)": {
    typeName: "LT Kindergeburtstag x3",
    game: "Lasertag",
    colorCode: "#3fbf3f",
    softdrinkPerPlayer: 2,
    beerPerPlayer: 0,
    sweets: true,
    nachos: false,
  },
  "LT Geburtstag x4 (L)": {
    typeName: "LT Kindergeburtstag x4",
    colorCode: "#3fbf3f",
    game: "Lasertag",
    softdrinkPerPlayer: 3,
    beerPerPlayer: 0,
    sweets: true,
    nachos: false,
  },
} as const;

export interface bookingTypeInterface {
  typeName: string;
  game: string;
  colorCode:string;
  softdrinkPerPlayer: number;
  beerPerPlayer: number;
  sweets: boolean;
  nachos: boolean;
}

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


