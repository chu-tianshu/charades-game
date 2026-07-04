import { formatRoundLength } from "../utils/formatRoundLength";
import type { RoundResult } from "../types";

interface ResultsScreenProps {
  result: RoundResult;
  onPlayAgain: () => void;
  onNewRound: () => void;
}

export function ResultsScreen({ result, onPlayAgain, onNewRound }: ResultsScreenProps) {
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

      {result.correctWords.length > 0 && (
        <div className="results-word-group">
          <p className="results-word-group-title">Correct</p>
          <div className="results-word-list">
            {result.correctWords.map((word, index) => (
              <span key={index} className="results-word-chip results-word-chip--correct">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.passedWords.length > 0 && (
        <div className="results-word-group">
          <p className="results-word-group-title">Passed</p>
          <div className="results-word-list">
            {result.passedWords.map((word, index) => (
              <span key={index} className="results-word-chip results-word-chip--passed">
                {word}
              </span>
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
    </div>
  );
}
