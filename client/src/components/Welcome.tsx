import React, { useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import { useMediaQuery } from '@mui/material';

const Welcome = () => {
  const navigate = useNavigate();
  const theme = useTheme().breakpoints.down('sm');
  const mobile = useMediaQuery(theme);

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
      sx={{ height: '100vh', width: '100vw' }}
    >
      <Box alignContent={'center'} sx={{ maxWidth: mobile ? '90%' : '80%' }}>
        <Box sx={{ marginBottom: mobile ? 4 : 6 }}>
          <Typography
            variant='h1'
            align='center'
            gutterBottom
            sx={{
              fontFamily: 'Roboto',
              fontSize: mobile ? '2.5rem' : '4rem',
            }}
          >
            Welcome to
          </Typography>
          <Box
            sx={{
              alignSelf: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src='/img/mkdev_1200x600.gif'
              alt='mkdev logo'
              style={{ width: mobile ? '80vw' : '40vw', maxWidth: '600px' }}
            />
          </Box>
          <Typography
            variant='h1'
            align='center'
            sx={{
              fontFamily: 'Roboto',
              fontSize: mobile ? '1.5rem' : '2rem',
              fontWeight: 'bold',
              my: 3,
            }}
          >
            A Platform For Developers To Connect And Share Their Work
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          my: mobile ? 2 : 3,
          minHeight: '35vh',
        }}
        className='glass-card'
      >
        <Typography variant='h1' sx={{ fontSize: mobile ? 18 : 20 }}>
          Join the Community
        </Typography>
        <Button
          onClick={() => {
            navigate('/login');
          }}
          variant='contained'
          size={mobile ? 'medium' : 'large'}
        >
          Login
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Divider
            sx={{ borderColor: 'aliceblue', width: mobile ? '20vw' : '9vw' }}
          ></Divider>
          <Typography
            variant='h2'
            sx={{ fontSize: 16, marginX: mobile ? 0.5 : 1, my: 0.5 }}
          >
            OR
          </Typography>
          <Divider
            sx={{ borderColor: 'aliceblue', width: mobile ? '20vw' : '9vw' }}
          ></Divider>
        </Box>
        <Typography variant='h1' sx={{ fontSize: mobile ? 18 : 20 }}>
          Just Browse
        </Typography>
        <Button
          onClick={() => {
            navigate('/dashboard');
          }}
          variant='contained'
          size={mobile ? 'medium' : 'large'}
          sx={{
            mx: 2,
          }}
        >
          Continue Without Logging In
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
