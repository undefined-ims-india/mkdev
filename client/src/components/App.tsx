import React, { ReactElement } from 'react';
import '../styling/index.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const App = (): ReactElement => {
  return (
    <>
      <Nav />
    </>
  );
};

export default App;
