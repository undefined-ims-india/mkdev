import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GoogleButton from 'react-google-button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Divider } from '@mui/material';

const Welcome = () => {
  // should be the local strategy instead
  const login = () => {
    axios.get('/auth/google').catch((err) => {
      console.log(err);
    });
  };
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <div className='glass-card'>
        <Box alignContent={'center'}>
          <Typography
            variant='h1'
            align='center'
            gutterBottom
            sx={{ fontFamily: 'fangsong', fontSize: '3rem' }}
          >
            Welcome to
          </Typography>

          <Typography
            variant='h1'
            align='center'
            sx={{
              fontFamily: 'fangsong',
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
              fontFamily: 'fangsong',
              fontSize: '1rem',
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            A Platform For Developers To Connect And Share Their Work
          </Typography>
        </Box>
        <Box component='form' onSubmit={login} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Divider sx={{ my: 2, color: 'aliceblue' }}>OR</Divider>
        <Box>
          <form action='/auth/google' method='GET'>
            <Button type='submit'>
              <GoogleButton />
            </Button>
          </form>
        </Box>
      </div>
    </Box>
  );
};

export default Welcome;
