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
  | "randomMixed";

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  words: string[];
}

export type RoundLength = 30 | 60 | 90 | 120 | 180 | 240 | 300;

export type Screen = "setup" | "round" | "results";

export interface RoundResult {
  correctWords: string[];
  passedWords: string[];
  categoryLabel: string;
  roundLength: RoundLength;
}
