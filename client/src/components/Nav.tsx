import React, { ReactElement, useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../styling/ThemeToggle';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Nav = (): ReactElement => {

  const id = useContext(UserContext);

  return (
    <>
      <Box sx={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
      <Link to='/dashboard' style={{textDecoration: 'none'}}>
        <Typography variant='h1' sx={{fontSize: 36}}>mkDev</Typography>
      </Link>
      {!!id ?
      <>
        <Link to={`/user/${id}/profile`}>
          <Button>Profile</Button>
        </Link>
        <Link to='/messages'>
          <Button>Messages</Button>
        </Link>
        <Link to='/create-post'>
          <Button>Create Post</Button>
        </Link>
        <Link to='/logout'>
          <Button>Logout</Button>
        </Link>
      </>
      :
      <Link to='/login'>
          <Button>Login</Button>
        </Link>
      }
      <ThemeToggle />
      </Box>
    </>
  );
};

export default Nav;
