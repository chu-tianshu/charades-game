# Charades Web App — Spec

## Overview
A mobile-friendly web app for playing charades with a single phone held between two people. The phone is split into two halves, each oriented for one player. Built as a static React + Vite app, deployed to Vercel.

## Core Flow

1. **Home / Setup screen**
   - Choose a **category** (built-in word lists).
   - Choose a **round length** from timer presets.
   - "Start Round" button.

2. **Round screen** (landscape-locked, split into two halves)
   - The screen is divided into two rectangular halves stacked vertically, the top half rotated 180° so each half faces one of the two players sitting across from each other.
   - **Performer's half**: shows the current word (large text) and the countdown timer.
   - **Watcher's half** (rotated): shows the same word/timer upside-down relative to the performer, plus **Pass** and **Correct** buttons — this is the person who can see the audience/performer and taps the outcome.
   - Tapping **Correct** or **Pass**:
     - Brief color flash (green for correct, red/gray for pass) as visual feedback.
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
- Movies
- Animals
- Actions/Verbs
- Famous People
- Random Mixed (pulls from all categories)

Each category is a static array of **1000 words/phrases** baked into the app (no backend, no database).

### Round Length (timer presets)
- 30 seconds
- 60 seconds
- 90 seconds
- 120 seconds

No custom entry, no word-count mode — just pick one of the four presets.

## Layout & Interaction Details

- **Orientation**: Round screen is locked to landscape. On phones, this is done via CSS (`@media` + a rotation transform prompting the user to rotate the device) since the JS Screen Orientation lock API isn't reliably available on iOS Safari — if the device is portrait, show a "rotate your phone" prompt instead of the round UI.
- **Split screen**: Two equal halves of the viewport; the top half's content is rotated 180° with CSS so it reads correctly for someone sitting on the opposite side of the phone.
- **Buttons**: Pass and Correct buttons appear on **both halves** (so either player can tap, in case roles swap or a solo scorekeeper is on one side) — sized large for thumb taps.
- **Feedback**: Visual-only — brief full-half background color flash on tap (no sound, no vibration, per requirements). No orientation-lock haptics.
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
