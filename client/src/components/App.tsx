import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../styling/index.css'

const App = (): ReactElement => {
  return (
    <>
      <Link to='/dashboard'>Dashboard</Link>
      <br/>
      <Link to='/login'>Login</Link>
      <h1>Teachers aka Users</h1>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </>
  );
};

export default App;
