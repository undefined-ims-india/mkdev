import React, { ReactElement, useEffect, useState } from 'react';
import { UserProfile } from '../../../../types';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

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
    <Box>
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
      <Paper elevation={3} sx={{ width: 400, height: 200, m: 2, p: 2 }}>
        <Typography variant='h6' fontFamily='Sometype' align='center'>
          subscribed tags
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            overflow: 'hidden',
          }}
        >
          {profileData.tags && profileData.tags.length > 0 ? (
            profileData.tags.map((tag, index) => (
              <Chip key={index} component='div' label={tag.name} />
            ))
          ) : (
            <Typography variant='body2'>No interests, yet...</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AboutMe;
