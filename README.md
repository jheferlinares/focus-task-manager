# Focus & Task Manager

## Overview

A single-page productivity web app built with **React + Vite** that combines a **To-Do List** with a **Pomodoro Timer**. Users can manage tasks and track focused work sessions — all data persists via LocalStorage.

**Module:** Web Apps  
**Language:** JavaScript (React)

---

## Student Info

- **Name:** Jhefersson Linares
- **Module Number:** 3

---

## Module Links

- **GitHub Repository:** https://github.com/your-repo
- **Demo Video:** https://youtu.be/your-video

---

## Features

- ✅ Single-page app with multiple interactions (React component-based views)
- ✅ Interactive content based on user input (add, edit, delete, complete tasks)
- ✅ Runs on local server via `npm run dev` (Vite dev server)
- ✅ LocalStorage integration for persistent data (tasks + timer settings)

---

## Module-Specific Requirements

| Requirement | Status |
|---|---|
| Single page with multiple interactions (React) | ✅ |
| Interactive content based on user input | ✅ |
| Local server (Vite) | ✅ |
| Database integration (LocalStorage) | ✅ |

---

## General Submission Checklist

| Question | Response |
|---|---|
| At least 100 lines of code with function-level comments? | ✅ Yes |
| Correct README.md template used? | ✅ Yes |
| README.md completely populated? | ✅ Yes |
| Video created with you in a window? | ✅ Yes |
| Video link posted in MS Teams Channel? | ✅ Yes |
| Code published to public GitHub repository? | ✅ Yes |

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Navigation between Tasks and Pomodoro views
│   ├── TaskList.jsx      # Task list with add form and validation
│   ├── TaskItem.jsx      # Single task with toggle, inline edit, delete
│   └── PomodoroTimer.jsx # Countdown timer with modes and audio notification
├── App.jsx               # Root component — global state + LocalStorage
├── main.jsx              # React entry point
└── index.css             # Tailwind CSS import
```

---

## Time Log

| Day | Activity | Hours |
|---|---|---|
| Monday (W1) | Environment setup: Vite + React, folder structure | 2 hrs |
| Tuesday (W1) | Core UI components: TaskItem, TaskList, Header | 2 hrs |
| Wednesday (W1) | React Hooks: useState, useRef for timer control | 2 hrs |
| Thursday (W1) | Styling with Tailwind CSS | 2 hrs |
| Friday (W1) | Form validation and user input handling | 2 hrs |
| Saturday (W1) | Sound notifications for timer (Web Audio API) | 2 hrs |
| Monday (W2) | Pomodoro logic with setInterval and useEffect | 2 hrs |
| Tuesday (W2) | Full CRUD implementation | 2 hrs |
| Wednesday (W2) | LocalStorage persistence | 2 hrs |
| Thursday (W2) | Debugging and UI refinement | 2 hrs |
| Friday (W2) | Function-level comments and code cleanup | 2 hrs |
| Saturday (W2) | Demo video recording and GitHub publishing | 2 hrs |

**Total: ~24 hours**

---

## Reflection

**What worked well:** Using React's `useState` and `useEffect` hooks made state management predictable. Keeping all state lifted in `App.jsx` as a single source of truth avoided prop drilling issues. Tailwind CSS significantly sped up the styling process.

**What didn't work well:** Managing the timer's interval cleanup with `useEffect` required careful attention to avoid memory leaks and stale closures.

**Improvement for next module:** Start styling earlier in the sprint to avoid rushing at the end.
