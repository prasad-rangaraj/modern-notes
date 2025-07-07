import React, { useState, useEffect } from 'react';
import defaultImg from '../assets/default.jpeg';
import '../App.css';

const Profile = () => {
  const [user, setUser] = useState({
    username: 'john_doe',
    email: 'john@example.com',
    contact: '9876543210',
    profile_img: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  useEffect(() => {
    if (user.profile_img) {
      setPreviewURL(user.profile_img);
    } else {
      setPreviewURL(defaultImg);
    }
  }, [user.profile_img]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreviewURL(url);
    }
  };

  const handleSaveImage = () => {
    if (!selectedImage) return alert('Please choose an image first.');

    // 👇 Simulate upload (replace with real API call)
    const formData = new FormData();
    formData.append('profile_img', selectedImage);

    // Example: send to backend
    // fetch('/api/upload-profile-img', { method: 'POST', body: formData })

    console.log('Uploading image:', selectedImage.name);
    alert('Profile image updated successfully.');

    // Update user state with selected image (for demo only)
    setUser((prev) => ({ ...prev, profile_img: previewURL }));
    setSelectedImage(null);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>
      <div className="profile-card">
        <img src={previewURL} alt="Profile" className="profile-img" />
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
        </div>
      </div>

      <div className="profile-image-upload">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <button onClick={handleSaveImage}>Update Profile Image</button>
      </div>
    </div>
  );
};

export default Profile;
