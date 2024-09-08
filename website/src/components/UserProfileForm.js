"use client"
import React, { useState } from 'react';

const UserProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    CreatedAt: '',
    firstname: '',
    lastname: '',
    sex: 'trans',
    DOB: '',
    bio: '',
    hometown: '',
    profilePicURL: '',
    favoriteAnime: '',
    favoriteGenres: '',
    Top5anime: '',
    lastlogin: '',
    SocialMedia: {
      Instagram: '',
      Twitter: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('SocialMedia')) {
      const socialMediaKey = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        SocialMedia: { ...prevData.SocialMedia, [socialMediaKey]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const inputcss="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username"
        className={inputcss}
       value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input className={inputcss} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input className={inputcss} type="date" name="CreatedAt" value={formData.CreatedAt} onChange={handleChange} placeholder="Created At" />
      <input className={inputcss} type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" />
      <input className={inputcss} type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" />
      <select name="sex" value={formData.sex} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="trans">Trans</option>
      </select>
      <input className={inputcss} type="date" name="DOB" value={formData.DOB} onChange={handleChange} placeholder="Date of Birth" />
      <textarea className={inputcss} name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
      <input className={inputcss} type="text" name="hometown" value={formData.hometown} onChange={handleChange} placeholder="Hometown" />
      <input className={inputcss} type="text" name="profilePicURL" value={formData.profilePicURL} onChange={handleChange} placeholder="Profile Picture URL" />
      <input className={inputcss} type="text" name="favoriteAnime" value={formData.favoriteAnime} onChange={handleChange} placeholder="Favorite Anime" />
      <input className={inputcss} type="text" name="favoriteGenres" value={formData.favoriteGenres} onChange={handleChange} placeholder="Favorite Genres (comma-separated)" />
      <input className={inputcss} type="text" name="Top5anime" value={formData.Top5anime} onChange={handleChange} placeholder="Top 5 Anime (comma-separated)" />
      <input className={inputcss} type="date" name="lastlogin" value={formData.lastlogin} onChange={handleChange} placeholder="Last Login" />
      <input className={inputcss} type="text" name="SocialMedia.Instagram" value={formData.SocialMedia.Instagram} onChange={handleChange} placeholder="Instagram" />
      <input className={inputcss} type="text" name="SocialMedia.Twitter" value={formData.SocialMedia.Twitter} onChange={handleChange} placeholder="Twitter" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserProfileForm;
