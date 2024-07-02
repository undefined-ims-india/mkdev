import React, { useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await axios.get('/api/users/loggedIn');
        if (data.isLoggedIn) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
        navigate('/');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Box alignContent={'center'} className='glass-card'>
        <Typography
          variant='h1'
          align='center'
          gutterBottom
          sx={{ fontFamily: 'Roboto', fontSize: '3rem' }}
        >
          Welcome to
        </Typography>

        <Typography
          variant='h1'
          align='center'
          sx={{
            fontFamily: 'Roboto',
            fontSize: '6rem',
            fontWeight: 'bold',
          }}
        >
          MKDEV
        </Typography>
        <Typography
          variant='h1'
          align='center'
          gutterBottom
          sx={{
            fontFamily: 'Roboto',
            fontSize: '1rem',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          A Platform For Developers To Connect And Share Their Work
        </Typography>
      </Box>
    </Box>
  );
};

export default Welcome;
