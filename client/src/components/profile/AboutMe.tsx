import React, { ReactElement } from 'react';
import { UserProfile } from '../../../../types';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Divider } from '@mui/material';

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
      <Paper
        elevation={3}
        sx={{ width: 400, height: 200, m: 2, p: 2, overflow: 'hidden' }}
      >
        <Typography
          variant='h1'
          fontFamily='SomeType'
          align='center'
          fontSize={'1rem'}
          fontWeight={'bold'}
        >
          About {profileData.firstName}
          <Divider />
        </Typography>
        {profileData!.aboutMe ? (
          <Typography
            variant='body1'
            paragraph
            fontFamily={'SomeType'}
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'wrap',
            }}
          >
            {profileData!.aboutMe}
          </Typography>
        ) : (
          <Typography variant='body1' paragraph fontFamily={'SomeType'}>
            Nothing, yet...
          </Typography>
        )}
      </Paper>
      <Paper
        elevation={3}
        sx={{ width: 400, height: 200, m: 2, p: 2, overflow: 'hidden' }}
      >
        <Typography
          variant='h1'
          fontFamily='SomeType'
          align='center'
          fontSize={'1rem'}
          fontWeight={'bold'}
        >
          Interests
        </Typography>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            overflow: 'hidden',
          }}
        >
          {profileData!.tags && profileData!.tags.length > 0 ? (
            profileData!.tags.map((tag, index) => (
              <Chip
                key={index}
                component='div'
                label={tag.name}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              />
            ))
          ) : (
            <Typography variant='body2' fontFamily={'SomeType'}>
              No interests, yet...
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AboutMe;
