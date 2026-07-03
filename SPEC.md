# Charades Web App — Spec

## Overview
A mobile-friendly web app for playing charades. Built as a static React + Vite app, deployed to Vercel.

## Core Flow

1. **Home / Setup screen**
   - Choose a **category** (built-in word lists).
   - Choose a **round length** from timer presets.
   - "Start Round" button.

2. **Round screen** (landscape-locked, single orientation)
   - Full-screen landscape layout: a **Pass** button fills the left edge, a **Correct** button fills the right edge, and the current word + countdown timer are centered between them.
   - No mirrored/rotated content — one upright layout, tapped from whichever side is convenient.
   - Tapping **Correct** or **Pass**:
     - Brief brightness flash on the tapped button as visual feedback.
     - Advances immediately to the next word.
     - Increments the correct or pass counter for the round.
   - Timer counts down continuously across words; when it hits 0, the round ends automatically regardless of which word is showing.
   - Words are drawn from the selected category without repeats within a round (shuffled deck, drawn until exhausted or time runs out; reshuffle if the deck empties before time is up).

3. **Results screen**
   - Shows total **Correct** count and total **Passed** count for the round.
   - Optionally lists which words were guessed vs. passed (nice-to-have, not required for v1).
   - **Play Again** (same settings) and **New Round** (back to setup) buttons.

## Setup Options

### Categories (built-in, curated word lists)
- Movies — 1000 words
- Animals — 1000 words
- Actions/Verbs — 1000 words
- Famous People — 1000 words
- Countries — 200 words
- Famous Cities — 200 words
- Household Items — 200 words
- Computer Terminology — 200 words
- Universities — 200 words
- Sports — 200 words
- Food & Drink — 200 words
- Occupations — 200 words
- Random Mixed (pulls from all of the above)

Each category is a static array baked into the app (no backend, no database).

### Round Length (timer presets)
- 30 seconds
- 60 seconds
- 90 seconds
- 120 seconds

No custom entry, no word-count mode — just pick one of the four presets.

## Layout & Interaction Details

- **Orientation**: Round screen is locked to landscape. On phones, this is done via CSS (`@media (orientation: portrait)`) since the JS Screen Orientation lock API isn't reliably available on iOS Safari — if the device is portrait, show a "rotate your phone" prompt instead of the round UI.
- **Layout**: One upright landscape layout — Pass button as a full-height strip on the left, Correct button as a full-height strip on the right, word + timer centered between them. No mirrored/rotated content.
- **Feedback**: Visual-only — brief brightness flash on the tapped side button (no sound, no vibration, per requirements).
- **No teams/scoring across rounds**: each round is a standalone session; scores don't persist between rounds beyond the immediate results screen.

## Tech Stack
- **Framework**: React + Vite (TypeScript)
- **Styling**: Plain CSS (CSS modules or a single stylesheet) — no heavy UI library needed given the simple screens.
- **State**: Local component state / React context — no backend, no database, no auth.
- **Deployment**: Static build (`vite build`) deployed to **Vercel**. Requires a GitHub repo connected to Vercel (or `vercel` CLI deploy).

## Out of Scope (v1)
- Custom/user-entered word lists
- Multi-team scoreboards or persistent scoring across rounds
- Sound effects / haptic feedback
- Word-count-based (non-timer) rounds
- Accounts, saved history, multiplayer over network

## Open Items Before Build
- Need a GitHub account/repo and Vercel account (or CLI login) to actually publish the live URL — confirm you have these or want help setting them up.
- Confirm the exact word lists per category (I'll draft reasonable defaults; easy to edit later since they're just static arrays).
