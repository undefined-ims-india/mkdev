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
    picture: '',
  });

  newUser.name = `${newUser.firstName} ${newUser.lastName}`;

  const handleChange = (e: any) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', newUser);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxWidth='sm'>
      <Box
        className='glass-card'
        sx={{
          p: 3,
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component='h1'
          variant='h1'
          className='glass-card'
          sx={{
            p: 1,
            fontFamily: 'SomeType',
            fontSize: {
              xs: '1rem',
              sm: '1.2rem',
              md: '1.5rem',
            },
          }}
        >
          Enter Your Information To Create An Account
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            id='username'
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Name'
            id='name'
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='First Name'
            id='firstName'
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Last Name'
            id='lastName'
            onChange={handleChange}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
              mb: 2,
            }}
          >
            <Button variant='outlined' onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
