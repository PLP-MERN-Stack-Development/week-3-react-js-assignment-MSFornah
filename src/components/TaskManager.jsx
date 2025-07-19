import { useState, useEffect } from 'react';

export default function TaskManager() {
  // Load saved tasks from localStorage
 const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
});

const [filter, setFilter] = useState('all'); // <- New filter state
const [sortBy, setSortBy] = useState('none'); // 'dueDate', 'priority', 'creation'
const [editingTaskId, setEditingTaskId] = useState(null);
const [editedTask, setEditedTask] = useState({});

const [newTask, setNewTask] = useState({
  text: '',
  category: 'personal',  
  priority: 'medium',
  dueDate: '' 
});


  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
  if (newTask.text.trim()) {
    setTasks([...tasks, { 
      id: Date.now(), 
      ...newTask,       // Now includes category & priority
      completed: false 
    }]);
    setNewTask({ text: '', category: 'personal', priority: 'medium' });
  }
};

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({ ...task }); // Creates a copy to edit
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTaskId ? editedTask : task
    ));
    setEditingTaskId(null); // Exit edit mode
  };

// Filter tasks based on category
  const filteredTasks = tasks.filter(task => {
  if (filter === 'all') return true;
  if (filter === 'completed') return task.completed;
  if (filter === 'active') return !task.completed;
  return task.category === filter; // For personal/work
});


  return (
    <div className="space-y-4">
      {/* Task Input */}

    <div className="flex gap-2 mb-6">
    <input
        type="text"
        value={newTask.text}  // ← Must use newTask.text
        onChange={(e) => setNewTask({...newTask, text: e.target.value})}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}  // ← Optional but helpful
        placeholder="Add a new task"
        className="flex-1 p-2 border rounded"
        />
        {/* Category Selector */}


        

    <select
    value={newTask.category}
    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
    className="border rounded p-2"
    >
  <option value="personal">Personal</option>
  <option value="work">Work</option>
  <option value="shopping">Shopping</option>
    </select>

    {/* Priority Selector */}
    <select
  value={newTask.priority}
  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
  className="border rounded p-2"
    >
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
    </select>


 
<input
  type="date"
  value={newTask.dueDate || ''}
  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
  className="border rounded p-2"
/>
        <button 
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </div>


        {/* FILTER BUTTONS */}

<div className="flex flex-wrap gap-2 mb-4">
  <button
    onClick={() => setFilter('all')}
    className={`px-3 py-1 text-sm rounded-full ${
      filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
    }`}
  >
    All
  </button>
  <button
    onClick={() => setFilter('personal')}
    className={`px-3 py-1 text-sm rounded-full ${
      filter === 'personal' ? 'bg-purple-500 text-white' : 'bg-gray-200'
    }`}
  >
    Personal
  </button>
  <button
    onClick={() => setFilter('work')}
    className={`px-3 py-1 text-sm rounded-full ${
      filter === 'work' ? 'bg-blue-500 text-white' : 'bg-gray-200'
    }`}
  >
    Work
  </button>
  <button
    onClick={() => setFilter('completed')}
    className={`px-3 py-1 text-sm rounded-full ${
      filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'
    }`}
  >
    Completed
  </button>
  <button
    onClick={() => setFilter('active')}
    className={`px-3 py-1 text-sm rounded-full ${
      filter === 'active' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
    }`}
  >
    Active
  </button>
</div>
    {/* END OF FILTER BUTTONS */}


        
      {/* Tasks List */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks found</p>
        ) : (
        filteredTasks.map(task => (
        <li key={task.id} className="p-3 border rounded">
  {editingTaskId === task.id ? (
    /* ▼▼▼ EDIT MODE ▼▼▼ */
    <div className="space-y-3">
      <input
        value={editedTask.text}
        onChange={(e) => setEditedTask({...editedTask, text: e.target.value})}
        className="w-full p-2 border rounded"
        autoFocus
      />
      <div className="flex gap-2">
        <button 
          onClick={saveEdit}
          className="flex-1 py-1 bg-green-500 text-white rounded"
        >
          Save
        </button>
        <button 
          onClick={() => setEditingTaskId(null)}
          className="flex-1 py-1 bg-gray-300 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    /* ▼▼▼ NORMAL MODE ▼▼▼ */
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-4 w-4"
        />
        <span className={task.completed ? "line-through" : ""}>
          {task.text}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => startEditing(task)}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )}
</li>
          ))
        )}
      </ul>
    </div>
  );
}