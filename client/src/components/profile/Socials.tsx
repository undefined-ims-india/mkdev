import React, { ReactElement } from 'react';
import { UserProfile } from '../../../../types';
import MediumIcon from './icons/MediumIcon';
import DevIcon from './icons/DevIcon';
import MediumIconDisabled from './icons/MedIconDisabled';
import DevIconDisabled from './icons/DevIconDisabled';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface UserProps {
  profileData: UserProfile;
}

const Socials = ({ profileData }: UserProps): ReactElement => {
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent={'space-between'}
          gap='20px'
        >
          <Typography variant='body1' component='div'>
            {profileData!.linkedinId ? (
              <Link
                href={`https://www.linkedin.com/in/${profileData!.linkedinId}`}
                target='_blank'
                title='LinkedIn Profile'
              >
                <LinkedInIcon fontSize='large' sx={{ color: '#0A66C2' }} />
              </Link>
            ) : (
              <LinkedInIcon fontSize='large' color='disabled' />
            )}
          </Typography>
          <Typography variant='body1' component='div'>
            {profileData!.githubId ? (
              <Link
                href={`https://github.com/${profileData!.githubId}`}
                target='_blank'
                title='GitHub Profile'
              >
                <GitHubIcon fontSize='large' sx={{ color: 'black' }} />
              </Link>
            ) : (
              <GitHubIcon fontSize='large' color='disabled' />
            )}
          </Typography>
          <Typography variant='body1' component='div'>
            {profileData!.devId ? (
              <Link
                href={`https://dev.to/${profileData!.devId}`}
                target='_blank'
                title='Dev.to Profile'
              >
                <DevIcon />
              </Link>
            ) : (
              <DevIconDisabled color='disabled' />
            )}
          </Typography>
          <Typography variant='body1' component='div'>
            {profileData!.mediumId ? (
              <Link
                href={`https://medium.com/@${profileData!.mediumId}`}
                target='_blank'
                title='Medium.dev Profile'
              >
                <MediumIcon />
              </Link>
            ) : (
              <MediumIconDisabled color='disabled' />
            )}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default Socials;
