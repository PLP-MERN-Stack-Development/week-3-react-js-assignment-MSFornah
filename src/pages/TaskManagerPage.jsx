// import React from 'react';
// // import TaskManager from "./components/TaskManager";
// import TaskManager from "../components/TaskManager.jsx";

// const TaskManagerPage = () => {
//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
//       <TaskManager />
//     </div>
//   );
// };

// export default TaskManagerPage;

import React from 'react';
import TaskManager from '../components/TaskManager';

export default function TaskManagerPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Tasks</h1>
      <TaskManager />
    </div>
  );
}