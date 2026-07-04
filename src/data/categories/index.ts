import type { CategoryInfo } from "../../types";
import { movies } from "./movies";
import { animals } from "./animals";
import { actions } from "./actions";
import { famousPeople } from "./famousPeople";
import { countries } from "./countries";
import { famousCities } from "./famousCities";
import { householdItems } from "./householdItems";
import { computerTerminology } from "./computerTerminology";
import { universities } from "./universities";
import { sports } from "./sports";
import { foodAndDrink } from "./foodAndDrink";
import { occupations } from "./occupations";
import { legalTerms } from "./legalTerms";
import { usPresidents } from "./usPresidents";
import { euCities } from "./euCities";
import { authors } from "./authors";
import { tvShows } from "./tvShows";
import { worldLandmarks } from "./worldLandmarks";
import { chineseFamousPeople } from "./chineseFamousPeople";
import { chineseCities } from "./chineseCities";
import { chineseUniversities } from "./chineseUniversities";
import { chineseEmperors } from "./chineseEmperors";
import { chineseLandmarks } from "./chineseLandmarks";
import { chinesePoliticians } from "./chinesePoliticians";
import { climbing } from "./climbing";
import { climbers } from "./climbers";

const allWords = [
  ...movies,
  ...animals,
  ...actions,
  ...famousPeople,
  ...countries,
  ...famousCities,
  ...householdItems,
  ...computerTerminology,
  ...universities,
  ...sports,
  ...foodAndDrink,
  ...occupations,
  ...legalTerms,
  ...usPresidents,
  ...euCities,
  ...authors,
  ...tvShows,
  ...worldLandmarks,
  ...chineseFamousPeople,
  ...chineseCities,
  ...chineseUniversities,
  ...chineseEmperors,
  ...chineseLandmarks,
  ...chinesePoliticians,
  ...climbing,
  ...climbers,
];

export const CATEGORIES: CategoryInfo[] = [
  { id: "movies", label: "Movies", words: movies },
  { id: "animals", label: "Animals", words: animals },
  { id: "actions", label: "Actions", words: actions },
  { id: "famousPeople", label: "Famous People", words: famousPeople },
  { id: "countries", label: "Countries", words: countries },
  { id: "famousCities", label: "Famous Cities", words: famousCities },
  { id: "householdItems", label: "Household Items", words: householdItems },
  { id: "computerTerminology", label: "Computer Terminology", words: computerTerminology },
  { id: "universities", label: "Universities", words: universities },
  { id: "sports", label: "Sports", words: sports },
  { id: "foodAndDrink", label: "Food & Drink", words: foodAndDrink },
  { id: "occupations", label: "Occupations", words: occupations },
  { id: "legalTerms", label: "Legal Terms", words: legalTerms },
  { id: "usPresidents", label: "US Presidents", words: usPresidents },
  { id: "euCities", label: "European Cities", words: euCities },
  { id: "authors", label: "Authors", words: authors },
  { id: "tvShows", label: "TV Shows", words: tvShows },
  { id: "worldLandmarks", label: "World Landmarks", words: worldLandmarks },
  { id: "chineseFamousPeople", label: "Chinese Famous People", words: chineseFamousPeople },
  { id: "chineseCities", label: "Chinese Cities", words: chineseCities },
  { id: "chineseUniversities", label: "Chinese Universities", words: chineseUniversities },
  { id: "chineseEmperors", label: "Chinese Emperors", words: chineseEmperors },
  { id: "chineseLandmarks", label: "Chinese Landmarks", words: chineseLandmarks },
  { id: "chinesePoliticians", label: "Chinese Politicians", words: chinesePoliticians },
  { id: "climbing", label: "Climbing", words: climbing },
  { id: "climbers", label: "Climbers", words: climbers },
  { id: "randomMixed", label: "Random Mixed", words: allWords },
];

export function getCategoryById(id: CategoryInfo["id"]): CategoryInfo {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category id: ${id}`);
  return category;
}
