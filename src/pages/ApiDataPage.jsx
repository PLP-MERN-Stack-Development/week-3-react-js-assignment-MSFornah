// import React from 'react';
// import ApiData from '../components/ApiData';

// const ApiDataPage = () => {
//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">API Data</h1>
//       <ApiData />
//     </div>
//   );
// };

// export default ApiDataPage;


import { useState, useEffect } from 'react';
import { fetchPosts } from '../api/jsonPlaceholder';
import Card from '../components/Card';

export default function ApiDataPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">API Data</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <Card key={post.id} className="p-4">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}