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
  | "randomMixed";

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  words: string[];
}

export type RoundLength = 30 | 60 | 90 | 120 | 180 | 240 | 300;

export type Screen = "setup" | "round" | "results";

export interface RoundResult {
  correct: number;
  passed: number;
  categoryLabel: string;
  roundLength: RoundLength;
}
