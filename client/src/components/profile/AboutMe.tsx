import React, { ReactElement, useEffect, useState } from 'react';
import { UserProfile } from '../../../../types';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';

interface UserInfoProps {
  profileData: UserProfile;
  UpdateUserInfo: (userInfo: UserProfile) => void;
  getProfile: () => void;
}

const AboutMe = ({ profileData }: UserInfoProps): ReactElement => {
  if (!profileData) {
    return (
      <Grid item xs={12}>
        <Box className='load-box'>
          <LinearProgress className='loading-bar' />
        </Box>
      </Grid>
    );
  }

  return (
    <Paper elevation={3} sx={{ width: 400, height: 200, m: 2, p: 2 }}>
      {profileData.aboutMe.length > 0 ? (
        <Typography variant='body1' paragraph>
          {profileData.aboutMe}
        </Typography>
      ) : (
        <Typography variant='body1' paragraph>
          'Nothing, yet...'
        </Typography>
      )}
    </Paper>
  );
};

export default AboutMe;
