import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('api/register', {
      method: 'post',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
    }
  };

  return (
    <>
      <h1 className="title"> Register </h1>
      <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
        <div>
          <input type="text" placeholder="Name" value={formData.name} />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
          {errors.password_confirmation && (
            <p className="error">{errors.password_confirmation}</p>
          )}
        </div>
        <button className="primary-btn">Register</button>
      </form>
    </>
  );
};

export default Register;
