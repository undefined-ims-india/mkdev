import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import PostCreationPage from './components/PostCreationPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './components/Search';

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
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);

// root.render(<App />)
