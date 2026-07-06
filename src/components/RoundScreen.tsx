import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getCategoryById } from "../data/categories";
import { shuffle } from "../utils/shuffle";
import { formatRoundLength } from "../utils/formatRoundLength";
import type { CategoryId, RoundLength, RoundResult } from "../types";

interface RoundScreenProps {
  categoryId: CategoryId;
  roundLength: RoundLength;
  usedWords: Set<string>;
  onFinish: (result: RoundResult) => void;
  onExit: () => void;
}

type Flash = "correct" | "pass" | null;
type RoundPhase = "intro" | "countdown" | "playing";

const FLASH_DURATION_MS = 300;
const COUNTDOWN_START = 3;

function freshWordPool(allWords: string[], usedWords: Set<string>): string[] {
  const unused = allWords.filter((word) => !usedWords.has(word));
  return unused.length > 0 ? unused : allWords;
}

export function RoundScreen({ categoryId, roundLength, usedWords, onFinish, onExit }: RoundScreenProps) {
  const category = getCategoryById(categoryId);

  const deckRef = useRef<string[]>(shuffle(freshWordPool(category.words, usedWords)));
  const [currentWord, setCurrentWord] = useState<string>(deckRef.current[0]);
  const [timeLeft, setTimeLeft] = useState<number>(roundLength);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [passedWords, setPassedWords] = useState<string[]>([]);
  const [flash, setFlash] = useState<Flash>(null);

  const [phase, setPhase] = useState<RoundPhase>("intro");
  const [countdownValue, setCountdownValue] = useState(COUNTDOWN_START);

  const finishedRef = useRef(false);
  const wordDisplayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    function fitWordText() {
      const el = wordDisplayRef.current;
      const container = el?.parentElement;
      if (!el || !container) return;

      const maxWidth = container.clientWidth - 24;
      const maxHeight = container.clientHeight * 0.6;
      const upperBound = Math.min(152, container.clientWidth * 0.22);

      let fontSize = upperBound;
      el.style.fontSize = `${fontSize}px`;

      let guard = 0;
      while (fontSize > 24 && guard < 60 && (el.scrollWidth > maxWidth || el.scrollHeight > maxHeight)) {
        fontSize -= 3;
        el.style.fontSize = `${fontSize}px`;
        guard++;
      }
    }

    fitWordText();
    window.addEventListener("resize", fitWordText);
    return () => window.removeEventListener("resize", fitWordText);
  }, [currentWord, phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish({
          correctWords,
          passedWords,
          categoryId,
          categoryLabel: category.label,
          roundLength,
        });
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdownValue <= 0) {
      setPhase("playing");
      return;
    }
    const timer = setTimeout(() => setCountdownValue((v) => v - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, countdownValue]);

  function startCountdown() {
    setCountdownValue(COUNTDOWN_START);
    setPhase("countdown");
  }

  function drawNextWord() {
    const deck = deckRef.current;
    deck.shift();
    if (deck.length === 0) {
      deckRef.current = shuffle(freshWordPool(category.words, usedWords));
    }
    setCurrentWord(deckRef.current[0]);
  }

  function triggerFlash(type: Flash) {
    setFlash(type);
    setTimeout(() => setFlash(null), FLASH_DURATION_MS);
  }

  function handleCorrect() {
    if (phase !== "playing" || timeLeft <= 0 || flash) return;
    const guessedWord = currentWord;
    setCorrectWords((words) => [...words, guessedWord]);
    triggerFlash("correct");
    setTimeout(() => drawNextWord(), FLASH_DURATION_MS);
  }

  function handlePass() {
    if (phase !== "playing" || timeLeft <= 0 || flash) return;
    const guessedWord = currentWord;
    setPassedWords((words) => [...words, guessedWord]);
    triggerFlash("pass");
    setTimeout(() => {
      const deck = deckRef.current;
      const passedWord = deck.shift()!;
      deck.push(passedWord);
      setCurrentWord(deck[0]);
    }, FLASH_DURATION_MS);
  }

  return (
    <div className="round-screen">
      <div className="game-area">
        <button type="button" className="exit-round-button" onClick={onExit} aria-label="Exit round">
          ✕
        </button>

        {phase === "intro" && (
          <div className="round-intro" onClick={startCountdown}>
            <p className="round-intro-category">{category.label}</p>
            <p className="round-intro-description">
              Act out or describe as many {category.label} as you can before time runs out. Tap the right
              side when your team guesses correctly, tap the left side to pass.
            </p>
            <p className="round-intro-meta">{formatRoundLength(roundLength)} round</p>
            <p className="round-intro-hint">Tap anywhere to begin</p>
          </div>
        )}

        {phase === "countdown" && (
          <div className="round-countdown">
            <span key={countdownValue} className="round-countdown-value">
              {countdownValue}
            </span>
          </div>
        )}

        {phase === "playing" && (
          <>
            <button type="button" className="side-button side-button--pass" onClick={handlePass} aria-label="Pass" />
            <button
              type="button"
              className="side-button side-button--correct"
              onClick={handleCorrect}
              aria-label="Correct"
            />

            <div className="center-content">
              <div className={`timer${timeLeft <= 10 ? " timer--warning" : ""}`}>{timeLeft}s</div>
              <div
                ref={wordDisplayRef}
                className={`word-display${flash ? ` word-display--flash-${flash}` : ""}`}
              >
                {currentWord}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
