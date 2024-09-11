"use client";

import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const isTokenExpired = checkTokenExpiry(token);
      if (!isTokenExpired) {
        setUser({ token });
      } else {
        refreshAccessToken();
      }
    }
  }, []);

  useEffect(() => {
    // Set up a periodic check for token expiry
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('accessToken');
      if (token && checkTokenExpiry(token)) {
        refreshAccessToken();
      }
    }, 5* 1000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const checkTokenExpiry = (token) => {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= exp * 1000;
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch('https://aniverse-backend-3gqz.onrender.com/refresh', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        const newAccessToken = data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        setUser({ token: newAccessToken });
      } else {
        console.log(data.message);
        logout();
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setUser({ token });
    // router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    Cookies.remove('refreshToken');
    setUser(null);
    // router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
