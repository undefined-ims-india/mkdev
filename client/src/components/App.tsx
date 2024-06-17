import React, { ReactElement, useContext } from 'react';
import '../styling/index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav';
import { UserProvider } from './UserContext';

import Dashboard from './Dashboard';
import PostCreationPage from './PostCreationPage';
import Login from './Login';
import Logout from './Logout';
import Search from './Search';
import Messages from './messages/Messages';
import Profile from './UserProfile';

import Box from '@mui/material/Box';

const routes = [
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
      path: '/messages',
      element: <Messages />,
  },
  {
    path: '/user/:id/profile',
    element: <Profile />
  },
]

const App = (): ReactElement => {

  const location = useLocation();

  return (
    <Box sx={{fontFamily: 'Roboto'}}>
      <UserProvider>
        {location.pathname === '/dashboard'? <></> : <Nav />}
        <Routes>
          {routes.map(({path, element}, index) => <Route key={path + index} path={path} element={element} />)}
        </Routes>
      </UserProvider>
    </Box>
  );
};

export default App;