import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Nav = (): ReactElement => {
  return (
    <>
      <Link to='/'>
        <h1>mkDev</h1>
      </Link>
      <Link to='/dashboard'>
        <Button color='primary'>Dashboard</Button>
      </Link>
      <Link to='/create-post'>
        <Button>Create Post</Button>
      </Link>
      <Link to='/login'>
        <Button>Login</Button>
      </Link>
      <Link to='/logout'>
        <Button>Logout</Button>
      </Link>
      <Link to='/profile'>
        <Button>Profile</Button>
      </Link>
      <Link to='/messages'>
        <Button>Messages</Button>
      </Link>
    </>
  );
};

export default Nav;
