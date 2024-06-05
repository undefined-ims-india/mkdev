import React, { ReactElement } from 'react';
import '../styling/index.css'
import { Link } from 'react-router-dom';
import { Button } from '@headlessui/react';

const App = (): ReactElement => {
  return (
    <>
      <Link to='/dashboard'>
          <Button className="bg-sky-900 backdrop-blur-sm text-white text-m">
            Dashboard
          </Button>
        </Link>
      <Link to='/create-post'>
          <Button className="bg-sky-900 backdrop-blur-sm text-white text-m">
            Create Post
          </Button>
        </Link>
      <h1>Teachers aka Users</h1>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </>
  );
};

export default App;
