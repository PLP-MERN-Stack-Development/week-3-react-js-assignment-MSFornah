import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Welcome!</h1>
      {/* <h1 className="text-3xl font-bold mb-4">Welcome to Task Manager!</h1> */}
      <p className="mb-6">Start organizing your tasks efficiently.</p>
      <Link 
        to="/tasks" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Tasks
      </Link>
    </div>
  );
}