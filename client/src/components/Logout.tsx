import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Logout = (): ReactElement => {
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.post('/logout').then(({ data }): void => {
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
