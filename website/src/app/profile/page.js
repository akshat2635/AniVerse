"use client"
import React, { useState } from 'react';
import UserProfileForm from '../../components/UserProfileForm';
import UserProfile from '../../components/UserProfile';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);

  const handleFormSubmit = (formData) => {
    setProfile(formData);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <UserProfileForm onSubmit={handleFormSubmit} />
      {profile && <UserProfile profile={profile} />}
    </div>
  );
};

export default UserProfilePage;
