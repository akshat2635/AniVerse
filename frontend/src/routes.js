// src/routes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Adjust the import path as necessary
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AnimePage from './pages/AnimePage';
import HomePage from './pages/HomePage';
import TagPage from './pages/TagPage';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/anime/:id" element={<AnimePage/>} />
        <Route path="/tags/:tag" element={<TagPage/>} />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
