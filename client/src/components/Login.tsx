import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import GoogleButton from 'react-google-button';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardMedia from '@mui/material/CardMedia';

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    navigate('/Register');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      console.log('Login successful', data);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = '/auth/google';
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Box alignContent={'center'} className='glass-card' width={'30%'}>
        <Box alignContent={'center'} className='glass-card'>
          <Box
            sx={{
              alignSelf: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component='img'
              image='/img/mkdev_1200x600.gif'
              alt='mkdev logo'
              sx={{ width: '40vw', maxWidth: '100%' }}
            />
          </Box>
        </Box>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, p: 3, justifyContent: 'center' }}
        >
          <FormControl fullWidth margin='normal' required>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              id='email'
              name='email'
              value={email}
              onChange={handleEmail}
              autoComplete='email'
              required
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth margin='normal' required>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              name='password'
              type='password'
              id='password'
              value={password}
              onChange={handlePassword}
              required
            />
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ my: 2, alignContent: 'center' }}
          >
            Sign In
          </Button>
          <Button
            onClick={handleSignUp}
            variant='text'
            fullWidth
            sx={{ alignContent: 'center' }}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
        <Divider sx={{ mb: 1, color: 'aliceblue' }}>OR</Divider>
        <Box
          sx={{
            my: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button onClick={handleGoogleSignIn}>
            <GoogleButton />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
