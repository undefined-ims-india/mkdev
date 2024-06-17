import React, { ReactElement, useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../styling/ThemeToggle';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

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
