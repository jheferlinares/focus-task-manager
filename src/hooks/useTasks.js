import { useState, useEffect } from 'react';

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(() => loadFromStorage('ftm_tasks', []));

  useEffect(() => {
    localStorage.setItem('ftm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false }]);
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id, newText) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }

  return { tasks, addTask, toggleTask, deleteTask, editTask };
}
