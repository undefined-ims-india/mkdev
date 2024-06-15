import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './components/App';
import Dashboard from './components/Dashboard';
import Messages from './components/messages/Messages';
import Login from './components/Login';
import Logout from './components/Logout';
import PostCreationPage from './components/PostCreationPage';
import Profile from './components/Profile';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/messages',
        element: <Messages />,
    },
    {
        path:'/user/:id/profile',
        element: <UserProfile />
    }
]);

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
    </ThemeProvider>
);

// root.render(<App />)
