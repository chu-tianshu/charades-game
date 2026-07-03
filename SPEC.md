# Charades Web App — Spec

## Overview
A mobile-friendly web app for playing charades. Built as a static React + Vite app, deployed to Vercel.

## Core Flow

1. **Home / Setup screen**
   - Choose a **category** (built-in word lists).
   - Choose a **round length** from timer presets.
   - "Start Round" button.

2. **Round screen** (landscape-locked, single orientation)
   - Full-screen landscape layout: the left half of the screen is an invisible **Pass** tap zone, the right half is an invisible **Correct** tap zone (just a faint text hint at the bottom edge of each), and the current word + countdown timer float centered on top, spanning the full width.
   - No mirrored/rotated content — one upright layout, tapped from whichever side is convenient.
   - Tapping **Correct** or **Pass**:
     - A brief full-screen flash — white for Correct, black for Pass — appears instantly and fades out (~300ms).
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
- Movies — 290 words (trimmed to the most iconic/recognizable or recent titles)
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
- Legal Terms — 200 words
- US Presidents — one entry per person who has served (~45), not padded to a round number
- EU Cities — 200 words
- Authors — 200 words
- TV Shows — 200 words
- World Landmarks — 200 words
- Random Mixed (pulls from all of the above)

Each category is a static array baked into the app (no backend, no database).

### Round Length (timer presets)
- 30 seconds
- 60 seconds
- 90 seconds
- 120 seconds
- 3 minutes
- 4 minutes
- 5 minutes

No custom entry, no word-count mode — just pick one of the presets.

## Layout & Interaction Details

- **Orientation**: Round screen is locked to landscape. On phones, this is done via CSS (`@media (orientation: portrait)`) since the JS Screen Orientation lock API isn't reliably available on iOS Safari — if the device is portrait, show a "rotate your phone" prompt instead of the round UI.
- **Layout**: One upright landscape layout — the left half and right half of the screen are invisible full-height Pass/Correct tap zones (just a faint text hint at the bottom edge of each), with the word + timer floating centered on top. No mirrored/rotated content.
- **Feedback**: Visual-only — a brief full-screen flash (white for Correct, black for Pass) that appears instantly and fades out (no sound, no vibration, per requirements).
- **No teams/scoring across rounds**: each round is a standalone session; scores don't persist between rounds beyond the immediate results screen.

## Tech Stack
- **Framework**: React + Vite (TypeScript)
- **Styling**: Plain CSS (CSS modules or a single stylesheet) — no heavy UI library needed given the simple screens.
- **State**: Local component state / React context — no backend, no database, no auth.
- **Deployment**: Static build (`vite build`) deployed to **Vercel**, live at https://charades-game-blue.vercel.app. Source on GitHub at `chu-tianshu/charades-game`; deploys are currently triggered manually via `vercel --prod` (auto-deploy-on-push not yet connected).

## Out of Scope (v1)
- Custom/user-entered word lists
- Multi-team scoreboards or persistent scoring across rounds
- Sound effects / haptic feedback
- Word-count-based (non-timer) rounds
- Accounts, saved history, multiplayer over network
