export type CategoryId =
  | "movies"
  | "animals"
  | "actions"
  | "famousPeople"
  | "countries"
  | "famousCities"
  | "householdItems"
  | "computerTerminology"
  | "universities"
  | "sports"
  | "foodAndDrink"
  | "occupations"
  | "legalTerms"
  | "usPresidents"
  | "euCities"
  | "authors"
  | "tvShows"
  | "worldLandmarks"
  | "chineseFamousPeople"
  | "chineseCities"
  | "chineseUniversities"
  | "chineseEmperors"
  | "chineseLandmarks"
  | "chinesePoliticians"
  | "climbing"
  | "climbers"
  | "randomMixed";

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  words: string[];
  descriptions: Record<string, string>;
}

export type RoundLength = 30 | 60 | 90 | 120 | 180 | 240 | 300;

export type Screen = "setup" | "round" | "results";

export interface RoundResult {
  correctWords: string[];
  passedWords: string[];
  categoryId: CategoryId;
  categoryLabel: string;
  roundLength: RoundLength;
}
