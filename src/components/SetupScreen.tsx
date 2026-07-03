import { CATEGORIES } from "../data/categories";
import type { CategoryId, RoundLength } from "../types";

const ROUND_LENGTHS: RoundLength[] = [30, 60, 90, 120];

interface SetupScreenProps {
  categoryId: CategoryId;
  roundLength: RoundLength;
  onCategoryChange: (id: CategoryId) => void;
  onRoundLengthChange: (length: RoundLength) => void;
  onStart: () => void;
}

export function SetupScreen({
  categoryId,
  roundLength,
  onCategoryChange,
  onRoundLengthChange,
  onStart,
}: SetupScreenProps) {
  return (
    <div className="setup-screen">
      <h1 className="app-title">Charades</h1>

      <section className="setup-section">
        <h2 className="setup-section-title">Category</h2>
        <div className="option-grid">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                "option-button" + (category.id === categoryId ? " option-button--selected" : "")
              }
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="setup-section">
        <h2 className="setup-section-title">Round Length</h2>
        <div className="option-grid">
          {ROUND_LENGTHS.map((length) => (
            <button
              key={length}
              type="button"
              className={
                "option-button" + (length === roundLength ? " option-button--selected" : "")
              }
              onClick={() => onRoundLengthChange(length)}
            >
              {length}s
            </button>
          ))}
        </div>
      </section>

      <button type="button" className="start-button" onClick={onStart}>
        Start Round
      </button>
    </div>
  );
}
