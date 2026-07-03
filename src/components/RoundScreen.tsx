import { useEffect, useRef, useState } from "react";
import { getCategoryById } from "../data/categories";
import { shuffle } from "../utils/shuffle";
import type { CategoryId, RoundLength, RoundResult } from "../types";

interface RoundScreenProps {
  categoryId: CategoryId;
  roundLength: RoundLength;
  onFinish: (result: RoundResult) => void;
}

type Flash = "correct" | "pass" | null;

export function RoundScreen({ categoryId, roundLength, onFinish }: RoundScreenProps) {
  const category = getCategoryById(categoryId);

  const deckRef = useRef<string[]>(shuffle(category.words));
  const [currentWord, setCurrentWord] = useState<string>(deckRef.current[0]);
  const [timeLeft, setTimeLeft] = useState<number>(roundLength);
  const [correctCount, setCorrectCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [flash, setFlash] = useState<Flash>(null);

  const finishedRef = useRef(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish({
          correct: correctCount,
          passed: passedCount,
          categoryLabel: category.label,
          roundLength,
        });
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function drawNextWord() {
    const deck = deckRef.current;
    deck.shift();
    if (deck.length === 0) {
      deckRef.current = shuffle(category.words);
    }
    setCurrentWord(deckRef.current[0]);
  }

  function triggerFlash(type: Flash) {
    setFlash(type);
    setTimeout(() => setFlash(null), 300);
  }

  function handleCorrect() {
    if (timeLeft <= 0) return;
    setCorrectCount((c) => c + 1);
    triggerFlash("correct");
    drawNextWord();
  }

  function handlePass() {
    if (timeLeft <= 0) return;
    setPassedCount((p) => p + 1);
    triggerFlash("pass");
    const deck = deckRef.current;
    const passedWord = deck.shift()!;
    deck.push(passedWord);
    setCurrentWord(deck[0]);
  }

  return (
    <div className="round-screen">
      <div className="rotate-prompt">
        <p>Rotate your device to landscape to play</p>
      </div>

      <div className="game-area">
        <button
          type="button"
          className={"side-button side-button--pass" + (flash === "pass" ? " side-button--flash" : "")}
          onClick={handlePass}
        >
          Pass
        </button>

        <div className="center-content">
          <div className="timer">{timeLeft}s</div>
          <div className="word-display">{currentWord}</div>
        </div>

        <button
          type="button"
          className={"side-button side-button--correct" + (flash === "correct" ? " side-button--flash" : "")}
          onClick={handleCorrect}
        >
          Correct
        </button>
      </div>
    </div>
  );
}
