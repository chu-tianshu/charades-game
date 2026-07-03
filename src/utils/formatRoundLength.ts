import type { RoundLength } from "../types";

export function formatRoundLength(length: RoundLength): string {
  return length < 60 ? `${length}s` : `${length / 60}m`;
}
