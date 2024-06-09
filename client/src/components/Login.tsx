import React from 'react';
import { Button, Box, Typography } from '@mui/material';
const Login = () => {
  return (
    <div>
      <Box>
        <Typography variant='h2' align='center' gutterBottom>
          MkDev
        </Typography>
      </Box>
      <form action='/auth/google' method='GET'>
        <h3>Login to through Google!</h3>
        <Button variant='contained' type='submit'>
          Sign-In
        </Button>
      </form>
    </div>
  );
};

export default Login;
