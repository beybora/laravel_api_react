import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="title">Latest Posts:</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
            key={post.id}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h2>{post.title}</h2>
              </div>
              <Link
                to={`/posts/${post.id}`}
                className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Read more
              </Link>
            </div>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>There are no posts</p>
      )}
    </>
  );
};

export default Home;
