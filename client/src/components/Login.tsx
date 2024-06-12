import React, { ReactElement, useContext } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { UserContext } from './User';

const Login = (): ReactElement => {
  const { user, setUser } = useContext(UserContext);

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
          <Button type='submit'>
            <GoogleButton />
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Login;
