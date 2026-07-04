import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { getCategoryById } from "../data/categories";
import { shuffle } from "../utils/shuffle";
import { formatRoundLength } from "../utils/formatRoundLength";
import type { CategoryId, RoundLength, RoundResult } from "../types";

interface RoundScreenProps {
  categoryId: CategoryId;
  roundLength: RoundLength;
  onFinish: (result: RoundResult) => void;
  onExit: () => void;
}

type FlipDirection = "correct" | "pass" | null;
type RoundPhase = "intro" | "countdown" | "playing";

const FLIP_DURATION_MS = 400;
const SWIPE_THRESHOLD_PX = 60;
const COUNTDOWN_START = 3;

export function RoundScreen({ categoryId, roundLength, onFinish, onExit }: RoundScreenProps) {
  const category = getCategoryById(categoryId);

  const deckRef = useRef<string[]>(shuffle(category.words));
  const [currentWord, setCurrentWord] = useState<string>(deckRef.current[0]);
  const [timeLeft, setTimeLeft] = useState<number>(roundLength);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [passedWords, setPassedWords] = useState<string[]>([]);
  const [flipDirection, setFlipDirection] = useState<FlipDirection>(null);
  const flipKeyRef = useRef(0);
  const swipeStartXRef = useRef<number | null>(null);

  const [phase, setPhase] = useState<RoundPhase>("intro");
  const [countdownValue, setCountdownValue] = useState(COUNTDOWN_START);

  const finishedRef = useRef(false);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish({
          correctWords,
          passedWords,
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
      deckRef.current = shuffle(category.words);
    }
    setCurrentWord(deckRef.current[0]);
  }

  function triggerFlip(direction: FlipDirection) {
    flipKeyRef.current += 1;
    setFlipDirection(direction);
    setTimeout(() => setFlipDirection(null), FLIP_DURATION_MS);
  }

  function handleCorrect() {
    if (phase !== "playing" || timeLeft <= 0 || flipDirection) return;
    const guessedWord = currentWord;
    setCorrectWords((words) => [...words, guessedWord]);
    triggerFlip("correct");
    setTimeout(() => drawNextWord(), FLIP_DURATION_MS / 2);
  }

  function handlePass() {
    if (phase !== "playing" || timeLeft <= 0 || flipDirection) return;
    const guessedWord = currentWord;
    setPassedWords((words) => [...words, guessedWord]);
    triggerFlip("pass");
    setTimeout(() => {
      const deck = deckRef.current;
      const passedWord = deck.shift()!;
      deck.push(passedWord);
      setCurrentWord(deck[0]);
    }, FLIP_DURATION_MS / 2);
  }

  function handleSwipeStart(event: ReactPointerEvent<HTMLDivElement>) {
    if (phase !== "playing") return;
    swipeStartXRef.current = event.clientX;
  }

  function handleSwipeEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const startX = swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    if (deltaX >= SWIPE_THRESHOLD_PX) {
      handleCorrect();
    } else if (deltaX <= -SWIPE_THRESHOLD_PX) {
      handlePass();
    }
  }

  return (
    <div className="round-screen">
      <div className="rotate-prompt">
        <p>Rotate your device to landscape to play</p>
      </div>

      <div
        className="game-area"
        onPointerDown={handleSwipeStart}
        onPointerUp={handleSwipeEnd}
        onPointerCancel={() => {
          swipeStartXRef.current = null;
        }}
      >
        <button type="button" className="exit-round-button" onClick={onExit} aria-label="Exit round">
          ✕
        </button>

        {phase === "intro" && (
          <div className="round-intro" onClick={startCountdown}>
            <p className="round-intro-category">{category.label}</p>
            <p className="round-intro-description">
              Act out or describe as many {category.label} as you can before time runs out. Swipe right
              when your team guesses correctly, swipe left to pass.
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
          <div className="center-content">
            <div className="timer">{timeLeft}s</div>
            <div
              key={flipKeyRef.current}
              className={`word-display${flipDirection ? ` word-display--flip-${flipDirection}` : ""}`}
            >
              {currentWord}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
