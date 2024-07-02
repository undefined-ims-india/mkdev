import React, { ReactElement } from 'react';
import { UserProfile } from '../../../../types';

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
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent={'space-evenly'}
      >
        <Typography variant='body1'>
          <Link
            href={`https://www.linkedin.com/in/${profileData!.linkedinId}`}
            target='_blank'
            title='LinkedIn Profile'
          >
            <LinkedInIcon fontSize='large' />
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            href={`https://github.com/${profileData!.githubId}`}
            target='_blank'
            title='GitHub Profile'
          >
            <GitHubIcon fontSize='large' />
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            href={`https://dev.to/${profileData!.devId}`}
            target='_blank'
            title='Dev.to Profile'
          >
            Dev.to
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            href={`https://medium.com/@${profileData!.mediumId}`}
            target='_blank'
            title='Medium.dev Profile'
          >
            Medium
          </Link>
        </Typography>
      </Box>
    </Grid>
  );
};

export default Socials;
