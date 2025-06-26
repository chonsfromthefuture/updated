import React, { useState } from "react";
import "./myprofile.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "The Collector",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
    // Send `profile` data to your backend here
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p className="subtitle">Manage and protect your account</p>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-left">
          <label>Username</label>
          <input type="text" name="username" value={profile.username} readOnly />
          <p className="note">Username can only be changed once.</p>

          <label>Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" placeholder="@gmail.com" value={profile.email} onChange={handleChange} />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Add number" value={profile.phone} onChange={handleChange} />

          <label>Gender</label>
          <div className="gender-options">
            <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
            <label><input type="radio" name="gender" value="other" onChange={handleChange} /> Other</label>
          </div>

          <label>Date of birth</label>
          <input type="date" name="dob" value={profile.dob} onChange={handleChange} />

          <button type="submit" className="save-btn">Save</button>
        </div>

        <div className="form-right">
          <img src={profile.image || "/default-avatar.png"} alt="Profile" className="profile-img" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p className="note">File size: max 1MB</p>
          <p className="note">File extension: .JPEG, .PNG</p>
        </div>
      </form>
    </div>
  );
}
