import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Nav = (): ReactElement => {
  return (
    <>
      <Link to='/dashboard'>Dashboard</Link>
      <br/>
      <Link to='/profile'>Profile</Link>
      <br/>
      <Link to='/messages'>Messages</Link>
      <br/>
      <Link to='/posts'>Posts</Link>
    </>
  );
};

export default Nav;