import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contact: '',
    password: '',
  });

  const [profileImg, setProfileImg] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('contact', formData.contact);
    formDataToSend.append('password', formData.password);

    if (profileImg) {
      formDataToSend.append('profile_img', profileImg);
    }

    try {
        await axios.post('http://localhost:5000/api/auth/register', formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Create Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form" encType="multipart/form-data">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="file" name="profile_img" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>

      <p className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
