# MunimJi — Frontend (v0.1)

"Every Indian deserves a personal Munim."

This is the frontend-only build of MunimJi: a mobile-first, AI-powered
financial literacy app for ordinary Indians, built with React, Vite, and
Tailwind CSS.

## What's working in this build

- First-launch language selection screen (10 Indian languages — UI text is
  currently English-only; see "Next steps" below for wiring real translations)
- Mobile-first layout with bottom navigation
- Guest mode vs signed-in mode (signed-in state is stored locally on-device
  for now — no real backend yet)
- Home page (hero, why MunimJi, learning teaser, calculators, schemes teaser,
  AI Munim teaser)
- Learn section with expandable topic cards (technical definition, simple
  explanation, real example, "try it yourself" link, audio via the browser's
  built-in text-to-speech)
- Financial Dictionary — 40 seeded terms across Basic Finance, Banking,
  Investment, Retirement, and Insurance, with search and category filter
  (structured so you can grow this to 70+ terms easily — see
  `src/data/dictionaryTerms.js`)
- SIP Calculator — fully working, with a live chart (invested vs total
  value) and passbook-style results. Verified against known SIP reference
  values.
- Calculators hub — FD, RD, Goal Planner, Inflation, and Wealth Simulator
  are scaffolded as "Soon" — the math for all of them already exists in
  `src/utils/financeMath.js` and is verified against real bank calculator
  reference values (HDFC, ICICI). Wiring up their pages is the next step.
- Goals module — guest view (locked, browse goal types) and signed-in view
  (sample goals with progress bars)
- AI Munim — a real chat interface wired to the Gemini API, with a system
  prompt that enforces "teacher, not advisor" rules (no stock picks, no
  guaranteed returns, multilingual response capability)
- Profile page — mock email/password and Google sign-in (local only for
  now), language switcher

## Setup

```bash
npm install
cp .env.example .env
# open .env and paste your Gemini API key
npm run dev
```

Get a free Gemini API key at https://aistudio.google.com/app/apikey

The app runs at http://localhost:5173

## Important: before you deploy this publicly

`src/utils/geminiClient.js` currently calls the Gemini API directly from the
browser. This is fine for local development, but it means your API key
would be visible in the browser's network tab / JS bundle if you deployed
it as-is. Before going live:

1. Build the Express backend (per the original project spec)
2. Move the Gemini call into a backend route, e.g. `POST /api/ai-munim/chat`
3. Have the frontend call your backend instead of Gemini directly
4. Keep your real Gemini key only in the backend's `.env`, never in the
   frontend bundle

## Project structure

```
src/
  components/       Layout, LanguageGate, PassbookCard (signature component)
  context/          AuthContext, LanguageContext
  data/             dictionaryTerms.js, learnTopics.js
  pages/            Home, Learn, Dictionary, Calculators, Goals, AiMunim, Profile
  pages/calculators/  SipCalculator (others to follow same pattern)
  utils/            financeMath.js (all calculator formulas), geminiClient.js
```

## Design system

- Saffron `#FF9933` — primary actions, CTAs
- Deep Navy `#0B1F3A` — headers, structure, trust
- India Green `#138808` — positive numbers, growth, success states
- Cream `#FFF8F0` — page background
- Signature component: the "passbook card" (`PassbookCard.jsx`) — styled
  like a page from a bank passbook/ledger, used consistently for goals,
  calculator results, and dictionary entries to give the app one
  unmistakable visual identity.

## Next steps (suggested order)

1. Wire FD, RD, Goal Planner, Inflation, and Wealth Simulator calculator
   pages (math already done — copy the `SipCalculator.jsx` pattern)
2. Build the Investment Comparison Center and Government Schemes pages
3. Grow the financial dictionary from 40 to 70+ terms
4. Add real i18n (e.g. `react-i18next`) so UI text — not just the AI's
   replies — actually changes when a language is selected
5. Build the Express + MongoDB backend, move auth and AI calls server-side
6. Add the Expense Analyzer and Personalised Dashboard
