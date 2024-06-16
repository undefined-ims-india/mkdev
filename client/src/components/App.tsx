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

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ColorModeContext } from '../styling/ThemeToggle';

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


  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          {location.pathname === '/dashboard'? <></> : <Nav />}
          <Routes>
            {routes.map(({path, element}, index) => <Route key={path + index} path={path} element={element} />)}
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;