import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const App = (): ReactElement => {
  return (
    <>
      <Link to='/dashboard'>Dashboard</Link>
      <br />
      <Link to='/login'>Login</Link>
      <br />
      <Link to='/logout'>Logout</Link>
      <br />
      <h1>Teachers aka Users</h1>
    </>
  );
};

export default App;
