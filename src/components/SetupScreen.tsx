import { useState } from "react";
import { CATEGORIES } from "../data/categories";
import { formatRoundLength } from "../utils/formatRoundLength";
import type { CategoryId, RoundLength } from "../types";

const ROUND_LENGTHS: RoundLength[] = [30, 60, 90, 120, 180, 240, 300];

type FeedbackStatus = "idle" | "sending" | "sent" | "error";

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
  const [feedback, setFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>("idle");

  async function handleSendFeedback() {
    const trimmed = feedback.trim();
    if (!trimmed || feedbackStatus === "sending") return;

    setFeedbackStatus("sending");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) throw new Error("Request failed");

      setFeedbackStatus("sent");
      setFeedback("");
    } catch {
      setFeedbackStatus("error");
    }
  }

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
              {formatRoundLength(length)}
            </button>
          ))}
        </div>
      </section>

      <button type="button" className="start-button" onClick={onStart}>
        Start Round
      </button>

      <section className="setup-section feedback-section">
        <h2 className="setup-section-title">Feedback</h2>
        <textarea
          className="feedback-textarea"
          placeholder="Found a bug? Have an idea for a category? Let us know..."
          value={feedback}
          onChange={(event) => {
            setFeedback(event.target.value);
            setFeedbackStatus("idle");
          }}
          rows={4}
        />
        <button
          type="button"
          className="secondary-button"
          onClick={handleSendFeedback}
          disabled={!feedback.trim() || feedbackStatus === "sending"}
        >
          {feedbackStatus === "sending" ? "Sending..." : "Send Feedback"}
        </button>
        {feedbackStatus === "sent" && <p className="feedback-sent-note">Thanks for the feedback!</p>}
        {feedbackStatus === "error" && (
          <p className="feedback-error-note">Couldn't send that — please try again.</p>
        )}
      </section>
    </div>
  );
}
