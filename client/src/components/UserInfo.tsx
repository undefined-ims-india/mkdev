import React, { useState } from 'react';
import { UserProfile } from '../../../types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface UserInfoProps {
  profileData: UserProfile;
  UpdateUserInfo: (userInfo: UserProfile) => void;
}

const UserInfo = ({
  profileData,
  UpdateUserInfo,
}: UserInfoProps): React.ReactElement => {
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(profileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: React.FormEvent): void => {
    e.preventDefault();
    UpdateUserInfo(userInfo!);
  };

  return (
    <Box component='form' sx={{ m: 1, width: '16' }} onSubmit={handleUpdate}>
      <Box>
        <TextField
          name='username'
          label='Username'
          value={userInfo!.username || ''}
          onChange={handleChange}
        />
        <TextField
          name='githubId'
          label='Github Username'
          value={userInfo!.githubId || ''}
          onChange={handleChange}
        />
        <TextField
          name='devId'
          label='Dev.to Username'
          value={userInfo!.devId || ''}
          onChange={handleChange}
        />
        <TextField
          name='mediumId'
          label='Medium.dev Username'
          value={userInfo!.mediumId || ''}
          onChange={handleChange}
        />
        <TextField
          name='linkedinId'
          label='LinkedIn Username'
          value={userInfo!.linkedinId || ''}
          onChange={handleChange}
        />
        <Button type='submit'>Update</Button>
      </Box>
    </Box>
  );
};

export default UserInfo;
