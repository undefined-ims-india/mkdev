import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import PostCreationPage from './components/PostCreationPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/create-post',
    element: <PostCreationPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);

// root.render(<App />)
