import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  async function handleCreate(e) {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'post',
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
    console.log(data);
  }
  return (
    <>
      <h1 className="title"> Create a new post</h1>
      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
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
        <button className="primary-btn">Create</button>
      </form>
    </>
  );
};

export default Create;
