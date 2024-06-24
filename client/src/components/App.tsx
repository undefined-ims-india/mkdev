import React, { ReactElement } from 'react';
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
import FullPost from './FullPost';
import Welcome from './Welcome';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from './ThemeToggle';
import { lightTheme, darkTheme } from '../styling/themes';
import Box from '@mui/material/Box';

const routes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/',
    element: <Welcome />,
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
    element: <Profile />,
  },
  {
    path: 'post/:id',
    element: <FullPost />,
  },
];

const App = (): ReactElement => {
  const location = useLocation();

  const [mode, setMode] = React.useState<typeof lightTheme | typeof darkTheme>(
    lightTheme
  );
  const colorMode = React.useMemo(
    // calculates value: returns an object, assigned to colorMode
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === lightTheme ? darkTheme : lightTheme
        );
      },
    }),
    []
  );

  const theme = React.useMemo(() => mode, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ fontFamily: 'Roboto' }}>
          <UserProvider>
            {location.pathname === '/dashboard' ? <></> : <Nav />}
            <Routes>
              {routes.map(({ path, element }, index) => (
                <Route key={path + index} path={path} element={element} />
              ))}
            </Routes>
          </UserProvider>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
