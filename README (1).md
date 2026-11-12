# Value-Based Pricing Flashcards

A small, dependency-free flashcard web app for learning value-based pricing vocabulary. Each card shows a term on the front; flip it to see a real-world example on the back. The page uses a dark theme and includes a progress bar and a card counter.

## Project structure

```
flashcards/
├── index.html        # Page structure (markup only)
├── styles.css        # All styling (dark theme, card flip animation, buttons)
├── script.js         # App logic (loads cards, flipping, navigation, keyboard shortcuts)
├── flashcards.json   # The card data (15 cards)
└── README.md         # This file
```

## How to run

The app loads its cards from `flashcards.json` using `fetch()`. Browsers block this when you open `index.html` directly from disk (`file://`), so run a small local server from inside the folder:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

Any other static server works too (for example `npx serve`, or the VS Code "Live Server" extension).

If the JSON cannot be loaded, the page shows a "Could not load cards" message instead of failing silently.

## How to use

| Action | Mouse / touch | Keyboard |
|---|---|---|
| Flip card | Click the card or the "Click card to flip" button | Space or Enter |
| Next card | Right arrow button | Right arrow key |
| Previous card | Left arrow button | Left arrow key |

- The **counter** (top right) shows your position, e.g. `3 / 15`.
- The **progress bar** fills in as you move forward through the deck.
- The **front** of each card shows the term and a short hint; the **back** shows an example or context.
- Moving to another card while one is flipped flips it back to the front first.

## Editing the cards

All content lives in `flashcards.json`. It is an array of objects with three fields:

```json
{
  "term": "Price Anchor",
  "definition": "Mentioning a comprehensive $50,000 corporate rebranding package first so that a $15,000 website proposal looks reasonable by comparison.",
  "hint": "Setting a high reference point for pricing."
}
```

| Field | Shown on | Description |
|---|---|---|
| `term` | Front | The vocabulary word or concept |
| `definition` | Back | An example or context illustrating the term |
| `hint` | Front (bottom) | A short clue. Optional: leave it as `""` to hide it |

To add, remove, or reorder cards, just edit the array. The counter and progress bar adjust automatically. Remember that JSON requires double quotes, and any double quote inside text must be escaped as `\"`.

## Included terms

Value-Based Pricing, Efficiency Paradox, Cost of Inaction (COI), Price Anchor, Scope Creep, Commoditization, Risk Premium, Diagnostic Phase, Tiered Options, Input vs Outcome, Buyer's Disqualifier, Decision-Maker Audit, Walk-Away Threshold, Upfront Pricing Boundary, Value Framing.

## Customizing the look

Colors, sizes, and animation timing are all in `styles.css`. Useful spots:

- `.card` `transition`: flip animation speed (default `0.6s`)
- `.card-wrapper` `height`: card height (default `360px`)
- `.progress-segment.active`: progress bar color (default `#4B80F4`)
- `.card-back`: back-of-card colors

## Technical notes

- Plain HTML, CSS, and JavaScript. No frameworks, no build step, no external libraries.
- The flip effect uses CSS 3D transforms (`perspective`, `rotateY`, `backface-visibility`).
- The layout is responsive and works on phones and desktops.
