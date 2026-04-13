/**
 * Header - Displays the app title and current active view navigation tabs.
 * @param {string} activeView - The currently active view ('tasks' or 'timer').
 * @param {function} setActiveView - Callback to switch between views.
 */
function Header({ activeView, setActiveView }) {
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">🎯 Focus & Task Manager</h1>
        <nav className="flex gap-2">
          <button
            onClick={() => setActiveView('tasks')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeView === 'tasks'
                ? 'bg-white text-indigo-700'
                : 'text-indigo-200 hover:bg-indigo-600'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveView('timer')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeView === 'timer'
                ? 'bg-white text-indigo-700'
                : 'text-indigo-200 hover:bg-indigo-600'
            }`}
          >
            Pomodoro
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
