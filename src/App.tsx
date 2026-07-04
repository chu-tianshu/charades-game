import { useState } from "react";
import { SetupScreen } from "./components/SetupScreen";
import { RoundScreen } from "./components/RoundScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import type { CategoryId, RoundLength, RoundResult, Screen } from "./types";
import "./App.css";

function App() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [categoryId, setCategoryId] = useState<CategoryId>("movies");
  const [roundLength, setRoundLength] = useState<RoundLength>(60);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [roundKey, setRoundKey] = useState(0);

  function handleStart() {
    setRoundKey((k) => k + 1);
    setScreen("round");
  }

  function handleRoundFinish(finishedResult: RoundResult) {
    setResult(finishedResult);
    setScreen("results");
  }

  function handlePlayAgain() {
    setRoundKey((k) => k + 1);
    setScreen("round");
  }

  function handleNewRound() {
    setScreen("setup");
  }

  return (
    <div className="app">
      {screen === "setup" && (
        <SetupScreen
          categoryId={categoryId}
          roundLength={roundLength}
          onCategoryChange={setCategoryId}
          onRoundLengthChange={setRoundLength}
          onStart={handleStart}
        />
      )}
      {screen === "round" && (
        <RoundScreen
          key={roundKey}
          categoryId={categoryId}
          roundLength={roundLength}
          onFinish={handleRoundFinish}
          onExit={handleNewRound}
        />
      )}
      {screen === "results" && result && (
        <ResultsScreen result={result} onPlayAgain={handlePlayAgain} onNewRound={handleNewRound} />
      )}
    </div>
  );
}

export default App;
