import React, { useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GoogleButton from 'react-google-button';
import Divider from '@mui/material/Divider'
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
      <Box alignContent={'center'} sx={{color: 'aliceblue'}}>
        <Box sx={{marginBottom: 6}}>
          <Typography
            variant='h1'
            align='center'
            gutterBottom
            sx={{ fontFamily: 'Roboto', fontSize: '4rem' }}
            >
            Welcome to
          </Typography>

          <Typography
            variant='h1'
            align='center'
            sx={{
              fontFamily: 'Roboto',
              fontSize: '7rem',
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
              fontSize: '2rem',
              fontWeight: 'bold',
              mb: 3,
            }}
            >
            A Platform For Developers To Connect And Share Their Work
          </Typography>
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems:'center', marginY: 3, minHeight: '25vh' }} className="glass-card">
        <Typography variant='h1' sx={{fontSize: 20}}>Join the Community</Typography>
        <form action='/auth/google' method='GET'>
          <Button type='submit'>
            <GoogleButton />
          </Button>
        </form>
        <Divider sx={{borderColor: 'aliceblue'}}>OR</Divider>
        <Typography variant='h1' sx={{fontSize: 20}}>Just Browse</Typography>
        <Button onClick={() => {navigate('/dashboard')}} variant="contained" size='large'>
          Continue Without Logging In
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
