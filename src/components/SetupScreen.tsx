import { useState } from "react";
import { CATEGORIES } from "../data/categories";
import { formatRoundLength } from "../utils/formatRoundLength";
import type { CategoryId, CategoryInfo, RoundLength } from "../types";

const ROUND_LENGTHS: RoundLength[] = [30, 60, 90, 120, 180, 240, 300];
const MAX_CUSTOM_NAME_LENGTH = 60;
const MAX_CUSTOM_INSTRUCTIONS_LENGTH = 300;

type FeedbackStatus = "idle" | "sending" | "sent" | "error";
type GenerationStatus = "idle" | "generating" | "error";

interface SetupScreenProps {
  categoryId: CategoryId;
  customCategory: CategoryInfo | null;
  roundLength: RoundLength;
  onCategoryChange: (id: CategoryId) => void;
  onCustomCategoryGenerated: (category: CategoryInfo) => void;
  onRoundLengthChange: (length: RoundLength) => void;
  onStart: () => void;
}

export function SetupScreen({
  categoryId,
  customCategory,
  roundLength,
  onCategoryChange,
  onCustomCategoryGenerated,
  onRoundLengthChange,
  onStart,
}: SetupScreenProps) {
  const [feedback, setFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>("idle");

  const [customName, setCustomName] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>("idle");

  const categories = customCategory ? [...CATEGORIES, customCategory] : CATEGORIES;

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

  async function handleGenerateCategory() {
    const trimmedName = customName.trim();
    if (!trimmedName || generationStatus === "generating") return;

    setGenerationStatus("generating");

    try {
      const response = await fetch("/api/generate-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, instructions: customInstructions.trim() }),
      });

      if (!response.ok) throw new Error("Request failed");

      const data = (await response.json()) as { words: string[]; descriptions: Record<string, string> };

      onCustomCategoryGenerated({
        id: "custom",
        label: trimmedName,
        words: data.words,
        descriptions: data.descriptions,
      });
      setGenerationStatus("idle");
    } catch {
      setGenerationStatus("error");
    }
  }

  return (
    <div className="setup-screen">
      <h1 className="app-title">Charades</h1>

      <section className="setup-section">
        <h2 className="setup-section-title">Category</h2>
        <div className="option-grid">
          {categories.map((category) => (
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

      <section className="setup-section custom-category-section">
        <h2 className="setup-section-title">Create Your Own Category</h2>
        <input
          type="text"
          className="custom-category-input"
          placeholder="Category name (e.g. 80s Movies)"
          value={customName}
          maxLength={MAX_CUSTOM_NAME_LENGTH}
          onChange={(event) => {
            setCustomName(event.target.value);
            setGenerationStatus("idle");
          }}
        />
        <textarea
          className="feedback-textarea"
          placeholder="Optional: any specific instructions (e.g. only 90s hip-hop songs, keep it family-friendly)"
          value={customInstructions}
          maxLength={MAX_CUSTOM_INSTRUCTIONS_LENGTH}
          onChange={(event) => {
            setCustomInstructions(event.target.value);
            setGenerationStatus("idle");
          }}
          rows={3}
        />
        <button
          type="button"
          className="secondary-button"
          onClick={handleGenerateCategory}
          disabled={!customName.trim() || generationStatus === "generating"}
        >
          {generationStatus === "generating" ? "Generating..." : "Generate Category"}
        </button>
        {generationStatus === "error" && (
          <p className="feedback-error-note">Couldn't generate that category — please try again.</p>
        )}
        {customCategory && generationStatus === "idle" && (
          <p className="feedback-sent-note">
            "{customCategory.label}" is ready — select it above to play. It won't be saved after you
            leave this page.
          </p>
        )}
      </section>

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
