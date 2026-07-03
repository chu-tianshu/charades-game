import type { CategoryInfo } from "../../types";
import { movies } from "./movies";
import { animals } from "./animals";
import { actions } from "./actions";
import { famousPeople } from "./famousPeople";

export const CATEGORIES: CategoryInfo[] = [
  { id: "movies", label: "Movies", words: movies },
  { id: "animals", label: "Animals", words: animals },
  { id: "actions", label: "Actions", words: actions },
  { id: "famousPeople", label: "Famous People", words: famousPeople },
  {
    id: "randomMixed",
    label: "Random Mixed",
    words: [...movies, ...animals, ...actions, ...famousPeople],
  },
];

export function getCategoryById(id: CategoryInfo["id"]): CategoryInfo {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category id: ${id}`);
  return category;
}
