import React, { ReactElement, useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../styling/ThemeToggle';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
// --- also in ThemeToggle --------------------------- //
// import { useTheme, createTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

// const ThemeToggle = () => {
//   const theme = useTheme();
//   const colorMode = React.useContext(ColorModeContext);
//   return (
//       <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
//         {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//       </IconButton>
//   );
// }
// -------- ThemeToggle -------------- //

const Nav = (): ReactElement => {

  const id = useContext(UserContext);

  return (
    <>
      <Link to='/dashboard'>
        <h1>mkDev</h1>
      </Link>
      <ThemeToggle />
      {!!id ?
        <Box sx={{flexDirection:'row'}}>
          <Link to='/create-post'>
            <Button>Create Post</Button>
          </Link>
          <Link to='/logout'>
            <Button>Logout</Button>
          </Link>
          <Link to={`/user/${id}/profile`}>
            <Button>Profile</Button>
          </Link>
          <Link to='/messages'>
            <Button>Messages</Button>
          </Link>
        </Box>
      :
        <Box sx={{flexDirection:'row'}}>
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
        </Box>
      }
    </>
  );
};

export default Nav;
