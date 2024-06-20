import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Logout = (): ReactElement => {
  const navigate = useNavigate();

  // Request to passport logout() function middleware
  useEffect(() => {
    axios.post('/logout').then(({ data }): void => {
      console.log('logout', data);
      if (!data.ok) {
        console.log('Logout failed');
      }
      navigate('/login');
    });
  }, []);

  return (
    <>
      <h2>You have successfully logged out!</h2>
    </>
  );
};

export default Logout;
