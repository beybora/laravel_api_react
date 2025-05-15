import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Show() {
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setPost(data);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!user || user.id !== post.user_id) {
      navigate('/');
      return;
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate('/');
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <>
      {post && post.id ? (
        <div
          className="my-6 p-4 border rounded-md border-dashed border-slate-400"
          key={post.id}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2>{post.title}</h2>
            </div>
          </div>
          <p>{post.body}</p>
          {user?.id === post?.user_id && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/posts/update/${post.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Update
              </Link>
              <form onSubmit={handleDelete}>
                <button
                  className="bg-red-500 text-white text-sm rounded-lg px-3 py-1"
                  type="submit"
                >
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>No such post</p>
      )}
    </>
  );
}
