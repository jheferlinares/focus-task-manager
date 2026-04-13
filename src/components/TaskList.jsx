import { useState } from 'react';
import TaskItem from './TaskItem';

/**
 * TaskList - Renders the list of tasks and the form to add new ones.
 * @param {Array} tasks - Array of task objects.
 * @param {function} onAdd - Callback to add a new task.
 * @param {function} onToggle - Callback to toggle task completion.
 * @param {function} onDelete - Callback to delete a task.
 * @param {function} onEdit - Callback to edit a task's text.
 */
function TaskList({ tasks, onAdd, onToggle, onDelete, onEdit }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  /** Handles form submission and validates input before adding a task. */
  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError('Task cannot be empty.');
      return;
    }
    if (trimmed.length < 3) {
      setError('Task must be at least 3 characters.');
      return;
    }
    onAdd(trimmed);
    setInputValue('');
    setError('');
  }

  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-4">
        {pending} task{pending !== 1 ? 's' : ''} remaining
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setError(''); }}
          placeholder="Add a new task..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

      <ul className="space-y-2">
        {tasks.length === 0 && (
          <li className="text-center text-gray-400 py-10 text-sm">No tasks yet. Add one above!</li>
        )}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
