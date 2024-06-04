import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const App = (): ReactElement => {
  return (
    <>
      <Link to='/dashboard'>Dashboard</Link>
      <br/>
      <Link to='/login'>Login</Link>
      <h1>Teachers aka Users</h1>
    </>
  );
};

export default App;
