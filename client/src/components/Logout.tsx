import React, { ReactElement, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Login from './Login';

const Logout = (): ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('/logout')
      .then(() => navigate('/login'))
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <Box>
      <Typography variant='h2' align='center' gutterBottom>
        You have successfully logged out!
      </Typography>
      <Login />
    </Box>
  );
};

export default Logout;
