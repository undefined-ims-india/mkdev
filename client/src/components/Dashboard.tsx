import React, { ReactElement } from 'react';
import Nav from './Nav';

const Dashboard = (): ReactElement => {
  return (
    <>
      <div>
        <Nav />
      </div>
      <p> This is the Dashboard! </p>
    </>
  );
};

export default Dashboard;
