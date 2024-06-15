import React, { ReactElement, useContext } from 'react';
import { UserContext } from './UserContext';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box'

const Nav = (): ReactElement => {

  const id = useContext(UserContext);

  return (
    <>
      <Link to='/dashboard'>
        <h1>mkDev</h1>
      </Link>
      {!!id ?
        <Box sx={{flexDirection:'row'}}>
          <Link to='/create-post'>
            <button>Create Post</button>
          </Link>
          <Link to='/logout'>
            <button>Logout</button>
          </Link>
          <Link to={`/user/${id}/profile`}>
            <button>Profile</button>
          </Link>
          <Link to='/messages'>
            <button>Messages</button>
          </Link>
        </Box>
      :
        <Box sx={{flexDirection:'row'}}>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </Box>
      }
    </>
  );
};

export default Nav;
