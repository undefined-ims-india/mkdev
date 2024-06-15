import React, { ReactElement } from 'react';
import '../styling/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';

import Dashboard from './Dashboard';
import PostCreationPage from './PostCreationPage';
import Login from './Login';
import Logout from './Logout';
import Search from './Search';
import Profile from './Profile';
import Messages from './messages/Messages';
import UserProfile from './UserProfile';

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
]

const App = (): ReactElement => {
  return (
    <>
      <Nav />
        <Routes>
          {routes.map(({path, element}, index) => <Route key={path + index} path={path} element={element} />)}
        </Routes>
    </>
  );
};

export default App;