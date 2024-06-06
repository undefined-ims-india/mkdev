import React, { ReactElement } from 'react';
import '../styling/index.css';
import { Link } from 'react-router-dom';

const App = (): ReactElement => {
  return (
    <>
      <Link to='/dashboard'>
        <button>Dashboard</button>
      </Link>
      <Link to='/create-post'>
        <button>Create Post</button>
      </Link>
      <h1>Teachers aka Users</h1>
    </>
  );
};

export default App;
