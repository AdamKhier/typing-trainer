# Typing Trainer

A dependency-free typing trainer with two modes: guided lessons and timed tests. No build step, no framework — just open `index.html`.

## Features

- **Learn mode** — 7 progressive lessons (home row → top row → bottom row → bigrams → common words → sentences) with live finger-zone keyboard highlighting
- **Test mode** — 15s / 30s / 60s timed tests with live WPM + accuracy, results overlay
- **Visual keyboard** — per-finger color coding with legend (pinky / ring / middle / index / thumbs)
- **Zero dependencies** — plain HTML/CSS/JS, works offline

## Run it

```bash
# Option 1: just open it
open index.html
# Option 2: serve it
python3 -m http.server 5173
# then visit http://127.0.0.1:5173
```

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | App shell (Learn + Test views, results overlay) |
| `css/style.css` | All styling |
| `js/lessons.js` | 7 lessons + finger map |
| `js/keyboard.js` | On-screen keyboard renderer |
| `js/app.js` | Learn/Test state, timers, WPM + accuracy scoring |

## How scoring works

WPM = (correct characters / 5) / minutes elapsed. Accuracy = correct keystrokes / total keystrokes.
