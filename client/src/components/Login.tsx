import React, { ReactElement, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import GoogleButton from 'react-google-button';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Login = (): ReactElement => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    navigate('/Register');
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login', { email, password });
      if (data.success) {
        navigate('/dashboard');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Box alignContent={'center'} className='glass-card'>
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
        <Box component='form' onSubmit={login} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin='normal' required>
            <InputLabel htmlFor='email'>User Email</InputLabel>
            <Input id='email' name='email' autoComplete='email' autoFocus />
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
          <Button onClick={handleSignUp} variant='text'>
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
