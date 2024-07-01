import React, { ReactElement, useContext } from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Follow from './Follow';
import { UserProfile } from '../../../../types';
import { UserContext } from '../UserContext';

interface ProfileProps {
  profileData: UserProfile;
  handleEdit: () => void;
}

const ProfileInfo = ({
  profileData,
  handleEdit,
}: ProfileProps): ReactElement => {
  const userId = useContext(UserContext);
  return (
    <>
      <Avatar
        sx={{
          width: 120,
          height: 120,
          mt: 2,
          borderColor: 'primary.main',
          border: '2px solid',
        }}
        src={profileData.picture !== null ? profileData.picture : ''}
        alt={profileData.username || profileData.name || ''}
      />
      <Box display='flex' justifyContent='center' mt={2} mb={2}>
        {userId === profileData.id ? (
          <IconButton aria-label='edit' onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        ) : (
          <Follow />
        )}
      </Box>
    </>
  );
};

export default ProfileInfo;
