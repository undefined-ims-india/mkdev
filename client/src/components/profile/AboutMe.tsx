import React, { ReactElement, useEffect, useState } from 'react';
import { UserProfile } from '../../../../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface UserInfoProps {
  profileData: UserProfile;
  UpdateUserInfo: (userInfo: UserProfile) => void;
  getProfile: () => void;
}

const AboutMe = ({ profileData }: UserInfoProps): ReactElement => {
  if (!profileData) {
    return (
      <Grid item xs={12}>
        <Typography align='center'>Loading...</Typography>
        <Box className='load-box'>
          <LinearProgress className='loading-bar' />
        </Box>
      </Grid>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, m: 2 }}>
      <CardContent>
        {profileData.aboutMe.length > 0 ? (
          <Typography variant='body1' paragraph>
            {profileData.aboutMe}
          </Typography>
        ) : (
          <Typography variant='body1' paragraph>
            'Nothing, yet...'
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutMe;
