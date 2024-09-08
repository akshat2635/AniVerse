import React from 'react';

const UserProfile = ({ profile }) => {
  return (
    <div>
      <h1>{profile.username}</h1>
      <p>Email: {profile.email}</p>
      <p>Created At: {profile.CreatedAt}</p>
      <p>Name: {profile.firstname} {profile.lastname}</p>
      <p>Sex: {profile.sex}</p>
      <p>Date of Birth: {profile.DOB}</p>
      <p>Bio: {profile.bio}</p>
      <p>Hometown: {profile.hometown}</p>
      <img src={profile.profilePicURL} alt="Profile" />
      <p>Favorite Anime: {profile.favoriteAnime}</p>
      <p>Favorite Genres: {profile.favoriteGenres}</p>
      <p>Top 5 Anime: {profile.Top5anime}</p>
      <p>Last Login: {profile.lastlogin}</p>
      <p>Instagram: {profile.SocialMedia.Instagram}</p>
      <p>Twitter: {profile.SocialMedia.Twitter}</p>
    </div>
  );
};

export default UserProfile;
