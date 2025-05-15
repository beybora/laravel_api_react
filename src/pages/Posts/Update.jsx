import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const Update = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setFormData({
        title: data.title,
        body: data.body,
      });
    }
  };

  async function handleUpdate(e) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <>
      <h1 className="title"> Update your post</h1>
      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Post Title"
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>
        <div>
          <textarea
            rows="6"
            name=""
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            id=""
            placeholder="Post Content"
          ></textarea>
          {errors.body && <p className="error">{errors.body[0]}</p>}
        </div>
        <button className="primary-btn">Update</button>
      </form>
    </>
  );
};
export default Update;
