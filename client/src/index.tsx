import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import Dashboard from './components/Dashboard';
import Messages from './components/messages/Messages';
import Login from './components/Login';
import Logout from './components/Logout';
import PostCreationPage from './components/PostCreationPage';
import Profile from './components/Profile';
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
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/messages',
    element: <Messages />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);

// root.render(<App />)
