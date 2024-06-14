import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Nav = (): ReactElement => {
  return (
    <>
      <Link to='/'>
        <h1>mkDev</h1>
      </Link>
      <Link to='/dashboard'>
        <button>Dashboard</button>
      </Link>
      <Link to='/create-post'>
        <button>Create Post</button>
      </Link>
      <Link to='/login'>
        <button>Login</button>
      </Link>
      <Link to='/logout'>
        <button>Logout</button>
      </Link>
      <Link to='/profile'>
        <button>Profile</button>
      </Link>
      <Link to='/messages'>
        <button>Messages</button>
      </Link>
      <Link to='/user/1/profile'>TEST</Link>
    </>
  );
};

export default Nav;
