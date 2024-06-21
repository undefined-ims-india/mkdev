import React, { ReactElement } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
const Login = (): ReactElement => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Box>
        <Typography
          variant='h2'
          align='center'
          gutterBottom
          sx={{ fontFamily: 'fangsong' }}
        >
          MKDEV
        </Typography>
      </Box>

      <Box>
        <form action='/auth/google' method='GET'>
          <Button type='submit'>
            <GoogleButton />
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
