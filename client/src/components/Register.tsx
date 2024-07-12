import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const Register = (): ReactElement => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    name: '',
  });

  const handleChange = (e: any) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userWithFullName = {
      ...newUser,
      name: `${newUser.firstName} ${newUser.lastName}`,
    };
    try {
      await axios.post('/auth/register', userWithFullName);
      const registeredUser = await axios.post('/auth/login', {
        email: newUser.email,
        password: newUser.password,
      });
      if (registeredUser.status === 200) {
        navigate('/survey');
      } else {
        console.error('Failed to register user.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          p: 3,
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Account Registration
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='firstName'
            label='First Name'
            name='firstName'
            autoComplete='firstName'
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='lastName'
            label='Last Name'
            name='lastName'
            autoComplete='lastName'
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
