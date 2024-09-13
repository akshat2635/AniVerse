// src/Layout.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the import path as necessary

const Layout = ({ children }) => {
  const location = useLocation();

  // Exclude Navbar on /login and /register routes
  const shouldShowNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;
