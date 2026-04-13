import { useState, useEffect, useRef } from 'react';

const MODES = {
  focus: { label: 'Focus', defaultMinutes: 25 },
  short: { label: 'Short Break', defaultMinutes: 5 },
  long:  { label: 'Long Break', defaultMinutes: 15 },
};

/**
 * PomodoroTimer - A countdown timer with focus/break modes and audio notification.
 * @param {object} settings - Timer duration settings { focus, short, long } in minutes.
 * @param {function} onSettingsChange - Callback to persist updated settings.
 */
function PomodoroTimer({ settings, onSettingsChange }) {
  const [mode, setMode] = useState('focus');
  const [secondsLeft, setSecondsLeft] = useState(settings.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState({ ...settings });
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  /** Resets the timer to the current mode's duration whenever mode or settings change. */
  useEffect(() => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSecondsLeft(settings[mode] * 60);
  }, [mode, settings]);

  /** Manages the countdown interval, plays a sound when time runs out. */
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  /** Plays a short beep sound using the Web Audio API. */
  function playBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);
  }

  /** Formats seconds into MM:SS display string. */
  function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  /** Saves the draft settings and propagates them to the parent. */
  function handleSaveSettings() {
    const validated = {
      focus: Math.max(1, Math.min(60, Number(draft.focus) || 25)),
      short: Math.max(1, Math.min(30, Number(draft.short) || 5)),
      long:  Math.max(1, Math.min(60, Number(draft.long)  || 15)),
    };
    onSettingsChange(validated);
    setShowSettings(false);
  }

  const progress = 1 - secondsLeft / (settings[mode] * 60);
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col items-center gap-6">
      {/* Mode selector */}
      <div className="flex gap-2">
        {Object.entries(MODES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              mode === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Circular progress */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="#4f46e5" strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
          {formatTime(secondsLeft)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className="bg-indigo-600 text-white px-8 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setIsRunning(false); setSecondsLeft(settings[mode] * 60); }}
          className="bg-gray-100 text-gray-600 px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Settings toggle */}
      <button
        onClick={() => { setDraft({ ...settings }); setShowSettings((s) => !s); }}
        className="text-sm text-indigo-500 hover:underline"
      >
        ⚙️ Customize durations
      </button>

      {showSettings && (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
          {Object.entries(MODES).map(([key, { label }]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm text-gray-600">{label} (min)</label>
              <input
                type="number"
                min="1" max="60"
                value={draft[key]}
                onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
          <button
            onClick={handleSaveSettings}
            className="w-full bg-indigo-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default PomodoroTimer;
