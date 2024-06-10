import React, { ReactElement, useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import axios from 'axios';

const Login = (): ReactElement => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // If/ when we plan to do the local strategy...
    // axios
    //   .get('/profile')
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 401) {
    //       window.location.href = '/login';
    //     } else {
    //       console.error('Error:', error);
    //     }
    //   });
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
