import { useState } from "react";
import { formatRoundLength } from "../utils/formatRoundLength";
import type { RoundResult } from "../types";

interface ResultsScreenProps {
  result: RoundResult;
  onPlayAgain: () => void;
  onNewRound: () => void;
}

interface SelectedWord {
  word: string;
  description: string;
}

export function ResultsScreen({ result, onPlayAgain, onNewRound }: ResultsScreenProps) {
  const [selected, setSelected] = useState<SelectedWord | null>(null);

  function showDescription(word: string) {
    setSelected({
      word,
      description: result.descriptions[word] ?? "No description available for this one yet.",
    });
  }

  return (
    <div className="results-screen">
      <h1 className="app-title">Round Over!</h1>
      <p className="results-meta">
        {result.categoryLabel} &middot; {formatRoundLength(result.roundLength)}
      </p>

      <div className="results-stats">
        <div className="results-stat results-stat--correct">
          <span className="results-stat-value">{result.correctWords.length}</span>
          <span className="results-stat-label">Correct</span>
        </div>
        <div className="results-stat results-stat--passed">
          <span className="results-stat-value">{result.passedWords.length}</span>
          <span className="results-stat-label">Passed</span>
        </div>
      </div>

      <p className="results-hint">Tap a word to see what it was</p>

      {result.correctWords.length > 0 && (
        <div className="results-word-group">
          <p className="results-word-group-title">Correct</p>
          <div className="results-word-list">
            {result.correctWords.map((word, index) => (
              <button
                key={index}
                type="button"
                className="results-word-chip results-word-chip--correct"
                onClick={() => showDescription(word)}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      {result.passedWords.length > 0 && (
        <div className="results-word-group">
          <p className="results-word-group-title">Passed</p>
          <div className="results-word-list">
            {result.passedWords.map((word, index) => (
              <button
                key={index}
                type="button"
                className="results-word-chip results-word-chip--passed"
                onClick={() => showDescription(word)}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="results-actions">
        <button type="button" className="start-button" onClick={onPlayAgain}>
          Play Again
        </button>
        <button type="button" className="secondary-button" onClick={onNewRound}>
          New Round
        </button>
      </div>

      {selected && (
        <div className="word-detail-overlay" onClick={() => setSelected(null)}>
          <div className="word-detail-card" onClick={(event) => event.stopPropagation()}>
            <p className="word-detail-title">{selected.word}</p>
            <p className="word-detail-description">{selected.description}</p>
            <button type="button" className="word-detail-close" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
