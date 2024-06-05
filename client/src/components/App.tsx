import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../styling/index.css'

const App = (): ReactElement => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        mkDev
      </h1>
      <div>
        <Link to='/dashboard'>Dashboard</Link>
      </div>
      <div>
        <Link to='/messages'>Messages</Link>
      </div>
    </>
  );
};

export default App;
