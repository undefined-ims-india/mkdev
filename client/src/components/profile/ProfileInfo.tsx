import React, { ReactElement, useContext } from 'react';
import Follow from './Follow';
import { UserProfile } from '../../../../types';
import { UserContext } from '../UserContext';
import Socials from './Socials';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';

interface ProfileProps {
  profileData: UserProfile | null;
  handleEdit: () => void;
}

const ProfileInfo = ({
  profileData,
  handleEdit,
}: ProfileProps): ReactElement => {
  const userId = useContext(UserContext).userId;

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
    <>
      <Card
        sx={{
          maxWidth: 250,
          margin: 'auto',
          mt: 2,
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <Box display='flex' flexDirection='column' alignItems='center' mb={2}>
          <Avatar
            sx={{ width: 120, height: 120, mt: 2 }}
            src={profileData!.picture !== null ? profileData!.picture : ''}
            alt={profileData!.username || profileData!.name || ''}
          />
          <Typography
            variant='h6'
            component='h2'
            sx={{
              mt: 2,
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: 'text.primary',
            }}
          >
            {profileData!.name}
          </Typography>
          <Typography
            variant='h6'
            component='h2'
            sx={{
              fontWeight: 'bold',
              fontSize: '.95rem',
              color: 'text.primary',
            }}
          >
            {profileData!.username ? `@${profileData!.username}` : ''}
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            sx={{ mt: 1, p: 1 }}
          >
            {profileData!.bio}
          </Typography>
          <Box display='flex' justifyContent='center' mt={2}>
            {userId === profileData!.id ? (
              <IconButton aria-label='edit' onClick={handleEdit} sx={{ mt: 2 }}>
                <EditIcon />
              </IconButton>
            ) : (
              <Follow />
            )}
          </Box>
        </Box>
        <Box mt={2}>
          <Socials profileData={profileData!} />
        </Box>
      </Card>
    </>
  );
};

export default ProfileInfo;
