import React, { ReactElement } from 'react';
import axios from 'axios';

import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import GoogleButton from 'react-google-button';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Login = (): ReactElement => {
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
          <FormControl fullWidth margin='normal' required>
            <InputLabel htmlFor='username'>Username</InputLabel>
            <Input
              id='username'
              name='username'
              autoComplete='username'
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth margin='normal' required>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              name='password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </FormControl>
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
        <Box
          sx={{
            my: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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

export default Login;
