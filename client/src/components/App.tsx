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
import Profile from './profile/UserProfile';
import FullPost from './FullPost';
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

  if (!window.localStorage.getItem('theme')) { window.localStorage.setItem('theme', 'light') }

  const [mode, setMode] = React.useState<typeof lightTheme | typeof darkTheme>(
    window.localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme
  );
  const colorMode = React.useMemo(
    // calculates value: returns an object, assigned to colorMode
    () => ({
      toggleColorMode: () => {
        if (window.localStorage.getItem('theme') === 'light') {
          setMode(darkTheme);
          window.localStorage.setItem('theme', 'dark')
        }
        else if (window.localStorage.getItem('theme') === 'dark') {
          setMode(lightTheme);
          window.localStorage.setItem('theme', 'light')
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
            background: mode.palette.mode === 'light' ?
              `url('data:image/svg+xml,<svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="600" fill="%23dff2f6"></rect><defs><linearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%"><stop offset="20%" stop-color="%233ad5d5" stop-opacity="1"></stop><stop offset="80%" stop-color="%233ad5d5" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_1" x1="33.3%" y1="0%" x2="100%" y2="100%"><stop offset="20%" stop-color="%233ad5d5" stop-opacity="1"></stop><stop offset="80%" stop-color="%2372dde1" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_2" x1="33.3%" y1="0%" x2="100%" y2="100%"><stop offset="20%" stop-color="%239be4eb" stop-opacity="1"></stop><stop offset="80%" stop-color="%2372dde1" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_3" x1="33.3%" y1="0%" x2="100%" y2="100%"><stop offset="20%" stop-color="%239be4eb" stop-opacity="1"></stop><stop offset="80%" stop-color="%23beebf2" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_4" x1="33.3%" y1="0%" x2="100%" y2="100%"><stop offset="20%" stop-color="%23dff2f6" stop-opacity="1"></stop><stop offset="80%" stop-color="%23beebf2" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%"><stop offset="20%" stop-color="%233ad5d5" stop-opacity="1"></stop><stop offset="80%" stop-color="%233ad5d5" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_1" x1="0%" y1="0%" x2="66.7%" y2="100%"><stop offset="20%" stop-color="%2372dde1" stop-opacity="1"></stop><stop offset="80%" stop-color="%233ad5d5" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_2" x1="0%" y1="0%" x2="66.7%" y2="100%"><stop offset="20%" stop-color="%2372dde1" stop-opacity="1"></stop><stop offset="80%" stop-color="%239be4eb" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_3" x1="0%" y1="0%" x2="66.7%" y2="100%"><stop offset="20%" stop-color="%23beebf2" stop-opacity="1"></stop><stop offset="80%" stop-color="%239be4eb" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_4" x1="0%" y1="0%" x2="66.7%" y2="100%"><stop offset="20%" stop-color="%23beebf2" stop-opacity="1"></stop><stop offset="80%" stop-color="%23dff2f6" stop-opacity="1"></stop></linearGradient></defs><g transform="translate(900, 0)"><path d="M0 486.7C-43.3 453.6 -86.6 420.4 -128.9 396.6C-171.1 372.8 -212.4 358.4 -241 331.7C-269.6 305 -285.4 266.1 -326 236.9C-366.6 207.7 -432 188.3 -462.9 150.4C-493.8 112.6 -490.3 56.3 -486.7 0L0 0Z" fill="%23cfeef4"></path><path d="M0 389.4C-34.6 362.9 -69.3 336.3 -103.1 317.3C-136.9 298.2 -169.9 286.7 -192.8 265.4C-215.6 244 -228.3 212.9 -260.8 189.5C-293.3 166.2 -345.6 150.6 -370.3 120.3C-395.1 90 -392.2 45 -389.4 0L0 0Z" fill="%23ade7ee"></path><path d="M0 292C-26 272.1 -51.9 252.2 -77.3 238C-102.7 223.7 -127.5 215 -144.6 199C-161.7 183 -171.3 159.6 -195.6 142.1C-220 124.6 -259.2 113 -277.8 90.2C-296.3 67.5 -294.2 33.8 -292 0L0 0Z" fill="%2387e0e6"></path><path d="M0 194.7C-17.3 181.4 -34.6 168.2 -51.5 158.6C-68.5 149.1 -85 143.4 -96.4 132.7C-107.8 122 -114.2 106.4 -130.4 94.8C-146.7 83.1 -172.8 75.3 -185.2 60.2C-197.5 45 -196.1 22.5 -194.7 0L0 0Z" fill="%2359d9db"></path><path d="M0 97.3C-8.7 90.7 -17.3 84.1 -25.8 79.3C-34.2 74.6 -42.5 71.7 -48.2 66.3C-53.9 61 -57.1 53.2 -65.2 47.4C-73.3 41.5 -86.4 37.7 -92.6 30.1C-98.8 22.5 -98.1 11.3 -97.3 0L0 0Z" fill="%233ad5d5"></path></g><g transform="translate(0, 600)"><path d="M0 -486.7C54.8 -487 109.5 -487.3 149.9 -461.3C190.2 -435.3 216.2 -383 255.7 -351.9C295.2 -320.9 348.3 -311 386.7 -281C425.1 -250.9 448.7 -200.6 462.9 -150.4C477.1 -100.2 481.9 -50.1 486.7 0L0 0Z" fill="%23cfeef4"></path><path d="M0 -389.4C43.8 -389.6 87.6 -389.8 119.9 -369C152.2 -348.2 172.9 -306.4 204.5 -281.5C236.2 -256.7 278.7 -248.8 309.4 -224.8C340.1 -200.7 359 -160.5 370.3 -120.3C381.7 -80.2 385.6 -40.1 389.4 0L0 0Z" fill="%23ade7ee"></path><path d="M0 -292C32.9 -292.2 65.7 -292.4 89.9 -276.8C114.1 -261.2 129.7 -229.8 153.4 -211.2C177.1 -192.5 209 -186.6 232 -168.6C255.1 -150.5 269.2 -120.4 277.8 -90.2C286.3 -60.1 289.2 -30.1 292 0L0 0Z" fill="%2387e0e6"></path><path d="M0 -194.7C21.9 -194.8 43.8 -194.9 59.9 -184.5C76.1 -174.1 86.5 -153.2 102.3 -140.8C118.1 -128.3 139.3 -124.4 154.7 -112.4C170 -100.4 179.5 -80.2 185.2 -60.2C190.9 -40.1 192.8 -20 194.7 0L0 0Z" fill="%2359d9db"></path><path d="M0 -97.3C11 -97.4 21.9 -97.5 30 -92.3C38 -87.1 43.2 -76.6 51.1 -70.4C59 -64.2 69.7 -62.2 77.3 -56.2C85 -50.2 89.7 -40.1 92.6 -30.1C95.4 -20 96.4 -10 97.3 0L0 0Z" fill="%233ad5d5"></path></g></svg>')`  
            :
              `url('data:image/svg+xml,%3Csvg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"%3E%3Crect x="0" y="0" width="900" height="600" fill="%23001220"%3E%3C/rect%3E%3Cdefs%3E%3ClinearGradient id="grad1_0" x1="33.3%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23831a50" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23831a50" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad1_1" x1="33.3%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23831a50" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23632055" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad1_2" x1="33.3%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23422251" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23632055" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad1_3" x1="33.3%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23422251" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23242145" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad1_4" x1="33.3%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%230c1b34" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23242145" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad1_5" x1="33.3%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%230c1b34" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23001220" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad2_0" x1="0%25" y1="0%25" x2="66.7%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23831a50" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23831a50" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad2_1" x1="0%25" y1="0%25" x2="66.7%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23632055" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23831a50" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad2_2" x1="0%25" y1="0%25" x2="66.7%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23632055" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23422251" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad2_3" x1="0%25" y1="0%25" x2="66.7%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23242145" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%23422251" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad2_4" x1="0%25" y1="0%25" x2="66.7%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23242145" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%230c1b34" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id="grad2_5" x1="0%25" y1="0%25" x2="66.7%25" y2="100%25"%3E%3Cstop offset="20%25" stop-color="%23001220" stop-opacity="1"%3E%3C/stop%3E%3Cstop offset="80%25" stop-color="%230c1b34" stop-opacity="1"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform="translate(900, 0)"%3E%3Cpath d="M0 486.7C-46.1 467.3 -92.1 447.8 -141.5 435.6C-190.9 423.4 -243.7 418.5 -286.1 393.8C-328.5 369.1 -360.6 324.5 -385.1 279.8C-409.6 235.1 -426.6 190.3 -442.2 143.7C-457.9 97 -472.3 48.5 -486.7 0L0 0Z" fill="%2305172a"%3E%3C/path%3E%3Cpath d="M0 405.6C-38.4 389.4 -76.8 373.1 -117.9 363C-159.1 352.8 -203.1 348.8 -238.4 328.2C-273.8 307.5 -300.5 270.4 -320.9 233.2C-341.3 195.9 -355.5 158.6 -368.5 119.7C-381.6 80.9 -393.6 40.4 -405.6 0L0 0Z" fill="%23171e3d"%3E%3C/path%3E%3Cpath d="M0 324.5C-30.7 311.5 -61.4 298.5 -94.4 290.4C-127.3 282.3 -162.5 279 -190.7 262.5C-219 246 -240.4 216.3 -256.7 186.5C-273.1 156.7 -284.4 126.9 -294.8 95.8C-305.3 64.7 -314.9 32.3 -324.5 0L0 0Z" fill="%2333224c"%3E%3C/path%3E%3Cpath d="M0 243.4C-23 233.6 -46.1 223.9 -70.8 217.8C-95.5 211.7 -121.8 209.3 -143.1 196.9C-164.3 184.5 -180.3 162.2 -192.5 139.9C-204.8 117.6 -213.3 95.2 -221.1 71.8C-229 48.5 -236.2 24.3 -243.4 0L0 0Z" fill="%23532254"%3E%3C/path%3E%3Cpath d="M0 162.2C-15.4 155.8 -30.7 149.3 -47.2 145.2C-63.6 141.1 -81.2 139.5 -95.4 131.3C-109.5 123 -120.2 108.2 -128.4 93.3C-136.5 78.4 -142.2 63.4 -147.4 47.9C-152.6 32.3 -157.4 16.2 -162.2 0L0 0Z" fill="%23741d54"%3E%3C/path%3E%3Cpath d="M0 81.1C-7.7 77.9 -15.4 74.6 -23.6 72.6C-31.8 70.6 -40.6 69.8 -47.7 65.6C-54.8 61.5 -60.1 54.1 -64.2 46.6C-68.3 39.2 -71.1 31.7 -73.7 23.9C-76.3 16.2 -78.7 8.1 -81.1 0L0 0Z" fill="%23831a50"%3E%3C/path%3E%3C/g%3E%3Cg transform="translate(0, 600)"%3E%3Cpath d="M0 -486.7C45.1 -463.2 90.2 -439.6 139.1 -428C187.9 -416.3 240.4 -416.6 286.1 -393.8C331.8 -370.9 370.7 -325 377 -273.9C383.3 -222.8 357.1 -166.7 370 -120.2C382.8 -73.7 434.8 -36.9 486.7 0L0 0Z" fill="%2305172a"%3E%3C/path%3E%3Cpath d="M0 -405.6C37.6 -386 75.2 -366.3 115.9 -356.6C156.6 -346.9 200.3 -347.2 238.4 -328.2C276.5 -309.1 308.9 -270.8 314.2 -228.3C319.4 -185.7 297.6 -138.9 308.3 -100.2C319 -61.4 362.3 -30.7 405.6 0L0 0Z" fill="%23171e3d"%3E%3C/path%3E%3Cpath d="M0 -324.5C30.1 -308.8 60.2 -293.1 92.7 -285.3C125.3 -277.6 160.3 -277.8 190.7 -262.5C221.2 -247.3 247.1 -216.6 251.3 -182.6C255.5 -148.6 238.1 -111.1 246.6 -80.1C255.2 -49.1 289.9 -24.6 324.5 0L0 0Z" fill="%2333224c"%3E%3C/path%3E%3Cpath d="M0 -243.4C22.6 -231.6 45.1 -219.8 69.5 -214C93.9 -208.2 120.2 -208.3 143.1 -196.9C165.9 -185.5 185.3 -162.5 188.5 -137C191.7 -111.4 178.5 -83.4 185 -60.1C191.4 -36.9 217.4 -18.4 243.4 0L0 0Z" fill="%23532254"%3E%3C/path%3E%3Cpath d="M0 -162.2C15 -154.4 30.1 -146.5 46.4 -142.7C62.6 -138.8 80.1 -138.9 95.4 -131.3C110.6 -123.6 123.6 -108.3 125.7 -91.3C127.8 -74.3 119 -55.6 123.3 -40.1C127.6 -24.6 144.9 -12.3 162.2 0L0 0Z" fill="%23741d54"%3E%3C/path%3E%3Cpath d="M0 -81.1C7.5 -77.2 15 -73.3 23.2 -71.3C31.3 -69.4 40.1 -69.4 47.7 -65.6C55.3 -61.8 61.8 -54.2 62.8 -45.7C63.9 -37.1 59.5 -27.8 61.7 -20C63.8 -12.3 72.5 -6.1 81.1 0L0 0Z" fill="%23831a50"%3E%3C/path%3E%3C/g%3E%3C/svg%3E');`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: (window.screen.height * .889),
            width: window.screen.width
          }}
        >
          <UserProvider>
            {['/', '/survey'].includes(location.pathname) ? <></> : <><Box sx={{marginBottom: '70px'}}></Box><Nav /></>}
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
