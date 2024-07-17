import React, { ReactElement } from 'react';
import { UserProfile } from '../../../../types';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

interface UserInfoProps {
  profileData: UserProfile;
  updateUserInfo: (userInfo: UserProfile) => void;
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
        sx={{
          width: { xs: '90%', sm: 400 },
          height: { xs: 'auto', sm: 200 },
          m: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant='h1'
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
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'wrap',
            }}
          >
            {profileData!.aboutMe}
          </Typography>
        ) : (
          <Typography variant='body1' paragraph>
            Nothing, yet...
          </Typography>
        )}
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: { xs: '90%', sm: 400 },
          height: { xs: 'auto', sm: 200 },
          m: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant='h1'
          align='center'
          fontSize={'1rem'}
          fontWeight={'bold'}
        >
          Interests
        </Typography>
        <Divider sx={{ my: 1 }} />
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
            <Typography variant='body2'>No interests, yet...</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AboutMe;
