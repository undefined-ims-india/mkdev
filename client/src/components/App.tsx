import React, { ReactElement } from 'react';
import '../styling/index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav';
import { UserProvider } from './UserContext';

import Dashboard from './Dashboard';
import PostCreationPage from './posts/post creation/PostCreationPage';
import Login from './Login';
import Logout from './Logout';
import Search from './Search';
import Messages from './messages/Messages';
import Profile from './profile/UserProfile';
import FullPost from './posts/full post/FullPost';
import SearchResults from './SearchResults';
import Welcome from './Welcome';
import Signup from './Survey';

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
    path: '/post/:id',
    element: <FullPost />,
  },
  {
    path: '/searchresults/:tagType/:tags',
    element: <SearchResults />,
  },
  {
    path: '/survey',
    element: <Signup />,
  },
];

const App = (): ReactElement => {
  const location = useLocation();

  if (!window.localStorage.getItem('theme')) {
    window.localStorage.setItem('theme', 'light');
  }

  const [mode, setMode] = React.useState<typeof lightTheme | typeof darkTheme>(
    window.localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme
  );
  const colorMode = React.useMemo(
    // calculates value: returns an object, assigned to colorMode
    () => ({
      toggleColorMode: () => {
        if (window.localStorage.getItem('theme') === 'light') {
          setMode(darkTheme);
          window.localStorage.setItem('theme', 'dark');
        } else if (window.localStorage.getItem('theme') === 'dark') {
          setMode(lightTheme);
          window.localStorage.setItem('theme', 'light');
        }
      },
    }),
    []
  );

  const theme = React.useMemo(() => mode, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: '100vh',
            scrollMarginBottom: 0,
            overflowY: 'scroll',
            overflowX: 'hidden',
            background:
              mode.palette.mode === 'light'
                ? `url('data:image/svg+xml,<svg id="visual" viewBox="0 0 900 675" width="900" height="675" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="675" fill="%23fdfdfd"></rect><defs><linearGradient id="grad1_0" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23bcbcbc" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23bcbcbc" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_1" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23bcbcbc" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23c9c9c9" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_2" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23d6d6d6" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23c9c9c9" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_3" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23d6d6d6" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23e3e3e3" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_4" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23f0f0f0" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23e3e3e3" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_5" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23f0f0f0" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23fdfdfd" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23bcbcbc" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23bcbcbc" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_1" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23c9c9c9" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23bcbcbc" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_2" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23c9c9c9" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23d6d6d6" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_3" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23e3e3e3" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23d6d6d6" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_4" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23e3e3e3" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23f0f0f0" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_5" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23fdfdfd" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23f0f0f0" stop-opacity="1"></stop></linearGradient></defs><g transform="translate(900, 0)"><path d="M0 506.3C-90.1 493.9 -180.3 481.6 -253.1 438.4C-326 395.2 -381.6 321.2 -420.9 243C-460.2 164.8 -483.2 82.4 -506.2 0L0 0Z" fill="%23f6f6f6"></path><path d="M0 421.9C-75.1 411.6 -150.2 401.3 -210.9 365.4C-271.7 329.4 -318 267.7 -350.7 202.5C-383.5 137.3 -402.7 68.7 -421.9 0L0 0Z" fill="%23e9e9e9"></path><path d="M0 337.5C-60.1 329.3 -120.2 321.1 -168.7 292.3C-217.3 263.5 -254.4 214.1 -280.6 162C-306.8 109.9 -322.1 54.9 -337.5 0L0 0Z" fill="%23dcdcdc"></path><path d="M0 253.1C-45.1 247 -90.1 240.8 -126.6 219.2C-163 197.6 -190.8 160.6 -210.4 121.5C-230.1 82.4 -241.6 41.2 -253.1 0L0 0Z" fill="%23cfcfcf"></path><path d="M0 168.8C-30 164.6 -60.1 160.5 -84.4 146.1C-108.7 131.7 -127.2 107.1 -140.3 81C-153.4 54.9 -161.1 27.5 -168.7 0L0 0Z" fill="%23c2c2c2"></path><path d="M0 84.4C-15 82.3 -30 80.3 -42.2 73.1C-54.3 65.9 -63.6 53.5 -70.1 40.5C-76.7 27.5 -80.5 13.7 -84.4 0L0 0Z" fill="%23bcbcbc"></path></g><g transform="translate(0, 675)"><path d="M0 -506.2C95.7 -497.1 191.3 -488 253.1 -438.4C314.9 -388.8 342.8 -298.8 379.3 -219C415.9 -139.2 461.1 -69.6 506.3 0L0 0Z" fill="%23f6f6f6"></path><path d="M0 -421.9C79.7 -414.3 159.5 -406.7 210.9 -365.4C262.4 -324 285.7 -249 316.1 -182.5C346.5 -116 384.2 -58 421.9 0L0 0Z" fill="%23e9e9e9"></path><path d="M0 -337.5C63.8 -331.4 127.6 -325.3 168.7 -292.3C209.9 -259.2 228.5 -199.2 252.9 -146C277.2 -92.8 307.4 -46.4 337.5 0L0 0Z" fill="%23dcdcdc"></path><path d="M0 -253.1C47.8 -248.6 95.7 -244 126.6 -219.2C157.5 -194.4 171.4 -149.4 189.7 -109.5C207.9 -69.6 230.5 -34.8 253.1 0L0 0Z" fill="%23cfcfcf"></path><path d="M0 -168.7C31.9 -165.7 63.8 -162.7 84.4 -146.1C105 -129.6 114.3 -99.6 126.4 -73C138.6 -46.4 153.7 -23.2 168.8 0L0 0Z" fill="%23c2c2c2"></path><path d="M0 -84.4C15.9 -82.9 31.9 -81.3 42.2 -73.1C52.5 -64.8 57.1 -49.8 63.2 -36.5C69.3 -23.2 76.8 -11.6 84.4 0L0 0Z" fill="%23bcbcbc"></path></g></svg>')`
                : `url('data:image/svg+xml,<svg id="visual" viewBox="0 0 900 675" width="900" height="675" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="675" fill="%230e0e0e"></rect><defs><linearGradient id="grad1_0" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%2300c569" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%2300c569" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_1" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%2300c569" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%231c9c56" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_2" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23227643" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%231c9c56" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_3" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23227643" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23205131" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_4" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%231a2f20" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23205131" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_5" x1="25%" y1="0%" x2="100%" y2="100%"><stop offset="23.333333333333336%" stop-color="%231a2f20" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%230e0e0e" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%2300c569" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%2300c569" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_1" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%231c9c56" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%2300c569" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_2" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%231c9c56" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23227643" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_3" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23205131" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%23227643" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_4" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%23205131" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%231a2f20" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_5" x1="0%" y1="0%" x2="75%" y2="100%"><stop offset="23.333333333333336%" stop-color="%230e0e0e" stop-opacity="1"></stop><stop offset="76.66666666666666%" stop-color="%231a2f20" stop-opacity="1"></stop></linearGradient></defs><g transform="translate(900, 0)"><path d="M0 506.3C-90.1 493.9 -180.3 481.6 -253.1 438.4C-326 395.2 -381.6 321.2 -420.9 243C-460.2 164.8 -483.2 82.4 -506.2 0L0 0Z" fill="%23151f18"></path><path d="M0 421.9C-75.1 411.6 -150.2 401.3 -210.9 365.4C-271.7 329.4 -318 267.7 -350.7 202.5C-383.5 137.3 -402.7 68.7 -421.9 0L0 0Z" fill="%231e4029"></path><path d="M0 337.5C-60.1 329.3 -120.2 321.1 -168.7 292.3C-217.3 263.5 -254.4 214.1 -280.6 162C-306.8 109.9 -322.1 54.9 -337.5 0L0 0Z" fill="%2322633a"></path><path d="M0 253.1C-45.1 247 -90.1 240.8 -126.6 219.2C-163 197.6 -190.8 160.6 -210.4 121.5C-230.1 82.4 -241.6 41.2 -253.1 0L0 0Z" fill="%2320894c"></path><path d="M0 168.8C-30 164.6 -60.1 160.5 -84.4 146.1C-108.7 131.7 -127.2 107.1 -140.3 81C-153.4 54.9 -161.1 27.5 -168.7 0L0 0Z" fill="%2314b05f"></path><path d="M0 84.4C-15 82.3 -30 80.3 -42.2 73.1C-54.3 65.9 -63.6 53.5 -70.1 40.5C-76.7 27.5 -80.5 13.7 -84.4 0L0 0Z" fill="%2300c569"></path></g><g transform="translate(0, 675)"><path d="M0 -506.2C95.7 -497.1 191.3 -488 253.1 -438.4C314.9 -388.8 342.8 -298.8 379.3 -219C415.9 -139.2 461.1 -69.6 506.3 0L0 0Z" fill="%23151f18"></path><path d="M0 -421.9C79.7 -414.3 159.5 -406.7 210.9 -365.4C262.4 -324 285.7 -249 316.1 -182.5C346.5 -116 384.2 -58 421.9 0L0 0Z" fill="%231e4029"></path><path d="M0 -337.5C63.8 -331.4 127.6 -325.3 168.7 -292.3C209.9 -259.2 228.5 -199.2 252.9 -146C277.2 -92.8 307.4 -46.4 337.5 0L0 0Z" fill="%2322633a"></path><path d="M0 -253.1C47.8 -248.6 95.7 -244 126.6 -219.2C157.5 -194.4 171.4 -149.4 189.7 -109.5C207.9 -69.6 230.5 -34.8 253.1 0L0 0Z" fill="%2320894c"></path><path d="M0 -168.7C31.9 -165.7 63.8 -162.7 84.4 -146.1C105 -129.6 114.3 -99.6 126.4 -73C138.6 -46.4 153.7 -23.2 168.8 0L0 0Z" fill="%2314b05f"></path><path d="M0 -84.4C15.9 -82.9 31.9 -81.3 42.2 -73.1C52.5 -64.8 57.1 -49.8 63.2 -36.5C69.3 -23.2 76.8 -11.6 84.4 0L0 0Z" fill="%2300c569"></path></g></svg>')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <UserProvider>
            {['/', '/survey'].includes(location.pathname) ? (
              <></>
            ) : (
              <>
                <Box sx={{ marginBottom: '70px' }}></Box>
                <Nav />
              </>
            )}
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
