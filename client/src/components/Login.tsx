import React, { ReactElement } from 'react';
import GoogleButton from 'react-google-button';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Login = (): ReactElement => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Box alignContent={'center'}>
        <Typography
          variant='h1'
          align='center'
          gutterBottom
          sx={{
            fontFamily: 'sans-serif',
            fontSize: '6rem',
            fontWeight: 'bold',
          }}
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
