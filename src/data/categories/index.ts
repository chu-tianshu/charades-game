import type { CategoryInfo } from "../../types";
import { movies, moviesDescriptions } from "./movies";
import { animals, animalsDescriptions } from "./animals";
import { actions, actionsDescriptions } from "./actions";
import { famousPeople, famousPeopleDescriptions } from "./famousPeople";
import { countries, countriesDescriptions } from "./countries";
import { famousCities, famousCitiesDescriptions } from "./famousCities";
import { householdItems, householdItemsDescriptions } from "./householdItems";
import { computerTerminology, computerTerminologyDescriptions } from "./computerTerminology";
import { universities, universitiesDescriptions } from "./universities";
import { sports, sportsDescriptions } from "./sports";
import { foodAndDrink, foodAndDrinkDescriptions } from "./foodAndDrink";
import { occupations, occupationsDescriptions } from "./occupations";
import { legalTerms, legalTermsDescriptions } from "./legalTerms";
import { usPresidents, usPresidentsDescriptions } from "./usPresidents";
import { euCities, euCitiesDescriptions } from "./euCities";
import { authors, authorsDescriptions } from "./authors";
import { tvShows, tvShowsDescriptions } from "./tvShows";
import { worldLandmarks, worldLandmarksDescriptions } from "./worldLandmarks";
import { chineseFamousPeople, chineseFamousPeopleDescriptions } from "./chineseFamousPeople";
import { chineseCities, chineseCitiesDescriptions } from "./chineseCities";
import { chineseUniversities, chineseUniversitiesDescriptions } from "./chineseUniversities";
import { chineseEmperors, chineseEmperorsDescriptions } from "./chineseEmperors";
import { chineseLandmarks, chineseLandmarksDescriptions } from "./chineseLandmarks";
import { chinesePoliticians, chinesePoliticiansDescriptions } from "./chinesePoliticians";
import { climbing, climbingDescriptions } from "./climbing";
import { climbers, climbersDescriptions } from "./climbers";
import { brands, brandsDescriptions } from "./brands";
import { airports, airportsDescriptions } from "./airports";

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
  ...brands,
  ...airports,
];

const allDescriptions: Record<string, string> = {
  ...moviesDescriptions,
  ...animalsDescriptions,
  ...actionsDescriptions,
  ...famousPeopleDescriptions,
  ...countriesDescriptions,
  ...famousCitiesDescriptions,
  ...householdItemsDescriptions,
  ...computerTerminologyDescriptions,
  ...universitiesDescriptions,
  ...sportsDescriptions,
  ...foodAndDrinkDescriptions,
  ...occupationsDescriptions,
  ...legalTermsDescriptions,
  ...usPresidentsDescriptions,
  ...euCitiesDescriptions,
  ...authorsDescriptions,
  ...tvShowsDescriptions,
  ...worldLandmarksDescriptions,
  ...chineseFamousPeopleDescriptions,
  ...chineseCitiesDescriptions,
  ...chineseUniversitiesDescriptions,
  ...chineseEmperorsDescriptions,
  ...chineseLandmarksDescriptions,
  ...chinesePoliticiansDescriptions,
  ...climbingDescriptions,
  ...climbersDescriptions,
  ...brandsDescriptions,
  ...airportsDescriptions,
};

export const CATEGORIES: CategoryInfo[] = [
  { id: "movies", label: "Movies", words: movies, descriptions: moviesDescriptions },
  { id: "animals", label: "Animals", words: animals, descriptions: animalsDescriptions },
  { id: "actions", label: "Actions", words: actions, descriptions: actionsDescriptions },
  { id: "famousPeople", label: "Famous People", words: famousPeople, descriptions: famousPeopleDescriptions },
  { id: "countries", label: "Countries", words: countries, descriptions: countriesDescriptions },
  { id: "famousCities", label: "Famous Cities", words: famousCities, descriptions: famousCitiesDescriptions },
  {
    id: "householdItems",
    label: "Household Items",
    words: householdItems,
    descriptions: householdItemsDescriptions,
  },
  {
    id: "computerTerminology",
    label: "Computer Terminology",
    words: computerTerminology,
    descriptions: computerTerminologyDescriptions,
  },
  { id: "universities", label: "Universities", words: universities, descriptions: universitiesDescriptions },
  { id: "sports", label: "Sports", words: sports, descriptions: sportsDescriptions },
  { id: "foodAndDrink", label: "Food & Drink", words: foodAndDrink, descriptions: foodAndDrinkDescriptions },
  { id: "occupations", label: "Occupations", words: occupations, descriptions: occupationsDescriptions },
  { id: "legalTerms", label: "Legal Terms", words: legalTerms, descriptions: legalTermsDescriptions },
  { id: "usPresidents", label: "US Presidents", words: usPresidents, descriptions: usPresidentsDescriptions },
  { id: "euCities", label: "European Cities", words: euCities, descriptions: euCitiesDescriptions },
  { id: "authors", label: "Authors", words: authors, descriptions: authorsDescriptions },
  { id: "tvShows", label: "TV Shows", words: tvShows, descriptions: tvShowsDescriptions },
  {
    id: "worldLandmarks",
    label: "World Landmarks",
    words: worldLandmarks,
    descriptions: worldLandmarksDescriptions,
  },
  {
    id: "chineseFamousPeople",
    label: "Chinese Famous People",
    words: chineseFamousPeople,
    descriptions: chineseFamousPeopleDescriptions,
  },
  { id: "chineseCities", label: "Chinese Cities", words: chineseCities, descriptions: chineseCitiesDescriptions },
  {
    id: "chineseUniversities",
    label: "Chinese Universities",
    words: chineseUniversities,
    descriptions: chineseUniversitiesDescriptions,
  },
  {
    id: "chineseEmperors",
    label: "Chinese Emperors",
    words: chineseEmperors,
    descriptions: chineseEmperorsDescriptions,
  },
  {
    id: "chineseLandmarks",
    label: "Chinese Landmarks",
    words: chineseLandmarks,
    descriptions: chineseLandmarksDescriptions,
  },
  {
    id: "chinesePoliticians",
    label: "Chinese Politicians",
    words: chinesePoliticians,
    descriptions: chinesePoliticiansDescriptions,
  },
  { id: "climbing", label: "Climbing", words: climbing, descriptions: climbingDescriptions },
  { id: "climbers", label: "Climbers", words: climbers, descriptions: climbersDescriptions },
  { id: "brands", label: "Famous Brands", words: brands, descriptions: brandsDescriptions },
  { id: "airports", label: "Airports", words: airports, descriptions: airportsDescriptions },
  { id: "randomMixed", label: "Random Mixed", words: allWords, descriptions: allDescriptions },
];

export function getCategoryById(id: CategoryInfo["id"]): CategoryInfo {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category id: ${id}`);
  return category;
}
