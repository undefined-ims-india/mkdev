import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import Dashboard from './components/Dashboard';
import Messages from './components/messages/Messages';
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
    path: '/messages',
    element: <Messages />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);

// root.render(<App />)
