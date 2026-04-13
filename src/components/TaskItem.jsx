import { useState } from 'react';

/**
 * TaskItem - Renders a single task with toggle, inline edit, and delete actions.
 * @param {object} task - The task object { id, text, completed }.
 * @param {function} onToggle - Callback to mark task complete/incomplete.
 * @param {function} onDelete - Callback to remove the task.
 * @param {function} onEdit - Callback to update the task text.
 */
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  /** Saves the edited task text if valid, otherwise cancels. */
  function handleSave() {
    const trimmed = editValue.trim();
    if (trimmed.length >= 3) {
      onEdit(task.id, trimmed);
    } else {
      setEditValue(task.text);
    }
    setIsEditing(false);
  }

  /** Handles Enter/Escape keys during inline editing. */
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setEditValue(task.text); setIsEditing(false); }
  }

  return (
    <li className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0"
      />

      {isEditing ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 border-b border-indigo-400 text-sm focus:outline-none px-1"
        />
      ) : (
        <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {task.text}
        </span>
      )}

      {!task.completed && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-indigo-500 text-xs transition-colors"
          title="Edit"
        >
          ✏️
        </button>
      )}
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 text-xs transition-colors"
        title="Delete"
      >
        🗑️
      </button>
    </li>
  );
}

export default TaskItem;
