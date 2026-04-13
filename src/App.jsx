import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';

const DEFAULT_SETTINGS = { focus: 25, short: 5, long: 15 };

/**
 * Loads a value from LocalStorage, returning a fallback if not found or invalid.
 * @param {string} key - The LocalStorage key.
 * @param {*} fallback - The default value if the key is missing.
 */
function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * App - Root component. Manages all global state (tasks, settings, active view)
 * and persists data to LocalStorage on every change.
 */
function App() {
  const [activeView, setActiveView] = useState('tasks');
  const [tasks, setTasks] = useState(() => loadFromStorage('ftm_tasks', []));
  const [timerSettings, setTimerSettings] = useState(() =>
    loadFromStorage('ftm_settings', DEFAULT_SETTINGS)
  );

  /** Persists tasks to LocalStorage whenever the tasks array changes. */
  useEffect(() => {
    localStorage.setItem('ftm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  /** Persists timer settings to LocalStorage whenever they change. */
  useEffect(() => {
    localStorage.setItem('ftm_settings', JSON.stringify(timerSettings));
  }, [timerSettings]);

  /** Adds a new task with a unique id and default completed state. */
  function handleAddTask(text) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  }

  /** Toggles the completed state of a task by its id. */
  function handleToggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  /** Removes a task from the list by its id. */
  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  /** Updates the text of an existing task by its id. */
  function handleEditTask(id, newText) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main>
        {activeView === 'tasks' ? (
          <TaskList
            tasks={tasks}
            onAdd={handleAddTask}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ) : (
          <PomodoroTimer
            settings={timerSettings}
            onSettingsChange={setTimerSettings}
          />
        )}
      </main>
    </div>
  );
}

export default App;
