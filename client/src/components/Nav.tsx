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
      <Box sx={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
      <Link to='/dashboard'>
        <h1>mkDev</h1>
      </Link>
      <ThemeToggle />
      {!!id ?
      <>
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
      </>
      :
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
      }
      </Box>
    </>
  );
};

export default Nav;
