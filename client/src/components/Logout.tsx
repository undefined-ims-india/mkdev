import React, { ReactElement, useEffect } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

const Logout = (): ReactElement => {
  useEffect(() => {
    axios.post('/logout').then(() => console.log('Logged out!'));
  }, []);

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
