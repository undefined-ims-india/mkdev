import React, { ReactElement, useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const Login = (): ReactElement => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // If/ when we plan to do the local strategy...
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Box>
        <Typography variant='h2' align='center' gutterBottom>
          <Link to='/'>
            <h1>mkDev</h1>
          </Link>
        </Typography>
      </Box>
      <form onSubmit={handleLogin}>
        <h3>Username</h3>
        <TextField
          label='Username'
          variant='outlined'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h3>Password</h3>
        <TextField
          label='Password'
          variant='outlined'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box mt={2}>
          <Button variant='contained' type='submit'>
            Login
          </Button>
        </Box>
      </form>
      <div>
        <form action='/auth/google' method='GET'>
          <button type='submit'>
            <GoogleButton />
          </button>
        </form>
      </div>
    </Box>
  );
};

export default Login;
