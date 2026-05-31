# Plan: UI Component — DialogBox

Follows the three-layer pattern: thin component → helper (JSX) → controller (logic).

## Step 1 — Add silhouette placeholder image

Add `source/lib/assets/silhouette.svg` — a simple square silhouette used as the default portrait when a `Character` has no `portraitUrl`.

## Step 2 — `DialogBoxController`

Create `source/lib/components/controllers/DialogBoxController.js`:

- Constructor receives the `Dialog` instance and a `closeDialog` callback
- Tracks `currentIndex` (starts at 0)
- `next()` — if not last: advance index; if last: call `closeDialog()` then fire `dialog.onEnd()` if defined
- `prev()` — go back (no-op on first)
- `isFirst()` — `currentIndex === 0`
- `isLast()` — `currentIndex === messages.length - 1`
- `currentMessage()` — returns the `Message` at `currentIndex`

## Step 3 — `DialogBoxHelper`

Create `source/lib/components/helpers/DialogBoxHelper.jsx`:

- Constructor receives the controller and the current message
- `portraitSection()` — renders the left column; returns `null` when `message.character` is absent
  - Square `<img>` using `character.portraitUrl` or the silhouette asset as fallback
  - Character name below the image
- `messageSection()` — renders the right column with `message.text`
- `prevButton()` — returns `null` when `controller.isFirst()`; otherwise renders a "Previous" button
- `nextButton()` — renders "Next" button; label may change on last message if desired

## Step 4 — `DialogBox` component

Create `source/lib/components/DialogBox.jsx`:

- Receives `dialog` and `onClose` as props
- Instantiates `DialogBoxController` (passing `dialog` and `onClose`)
- Instantiates `DialogBoxHelper` (passing controller and current message)
- Renders:
  - A fixed/absolute container at the bottom of the page
  - `helper.portraitSection()` on the left
  - `helper.messageSection()` on the right
  - `helper.prevButton()` and `helper.nextButton()` as navigation

## Files to Change

| File | Change |
|------|--------|
| `source/lib/assets/silhouette.svg` | **New** — placeholder portrait |
| `source/lib/components/controllers/DialogBoxController.js` | **New** — navigation controller |
| `source/lib/components/helpers/DialogBoxHelper.jsx` | **New** — JSX helper |
| `source/lib/components/DialogBox.jsx` | **New** — rendering layer |
