import React, { ReactElement, useContext } from 'react';
import { Avatar, Box, Card, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Follow from './Follow';
import { UserProfile } from '../../../../types';
import { UserContext } from '../UserContext';
import Socials from './Socials';

interface ProfileProps {
  profileData: UserProfile;
  handleEdit: () => void;
}

const ProfileInfo = ({
  profileData,
  handleEdit,
}: ProfileProps): ReactElement => {
  const userId = useContext(UserContext).userId;
  return (
    <Card sx={{ maxWidth: 300, margin: 'auto', mt: 2 }}>
      <Box display='flex' justifyContent='center' mb={2}>
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='center'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={8} lg={9}>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Avatar
                sx={{ width: 100, height: 100, mt: 2 }}
                src={profileData!.picture !== null ? profileData!.picture : ''}
                alt={profileData!.username || profileData!.name || ''}
              />
              <Box display='flex' justifyContent='center' mt={2} mb={2}>
                {userId === profileData!.id ? (
                  <IconButton aria-label='edit' onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <Follow />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Socials profileData={profileData!} />
      </Box>
    </Card>
  );
};

export default ProfileInfo;
