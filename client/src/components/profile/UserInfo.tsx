import React, { useState } from 'react';
import { UserProfile } from '../../../../types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import { Card, CardContent } from '@mui/material';

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
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdate = (e: React.FormEvent): void => {
    e.preventDefault();
    UpdateUserInfo(userInfo!);
  };

  return (
    <Box component='form' sx={{ m: 1, width: '16' }} onSubmit={handleUpdate}>
      <Stack spacing={2}>
        <FormControl sx={{ p: 2, my: 1, mx: 1, width: '10%' }}>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input
            sx={{ variant: 'contained', backgroundColor: 'white' }}
            id='username'
            name='username'
            value={userInfo!.username || ''}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ p: 2, my: 1, mx: 1, width: '10%' }}>
          <InputLabel htmlFor='githubId'>Github Username</InputLabel>
          <Input
            sx={{ variant: 'contained', backgroundColor: 'white' }}
            id='githubId'
            name='githubId'
            value={userInfo!.githubId || ''}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ p: 2, my: 1, mx: 1, width: '10%' }}>
          <InputLabel htmlFor='devId'>Dev.to Username</InputLabel>
          <Input
            sx={{ variant: 'contained', backgroundColor: 'white' }}
            id='devId'
            name='devId'
            value={userInfo!.devId || ''}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ p: 2, my: 1, mx: 1, width: '10%' }}>
          <InputLabel htmlFor='mediumId'>Medium Username</InputLabel>
          <Input
            sx={{ variant: 'contained', backgroundColor: 'white' }}
            id='mediumId'
            name='mediumId'
            value={userInfo!.mediumId || ''}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ p: 2, my: 1, mx: 1, width: '10%' }}>
          <InputLabel htmlFor='linkedinId'>LinkedIn Username</InputLabel>
          <Input
            sx={{ variant: 'contained', backgroundColor: 'white' }}
            id='linkedinId'
            name='linkedinId'
            value={userInfo!.linkedinId || ''}
            onChange={handleChange}
          />
        </FormControl>
        <Card sx={{ maxWidth: 600, m: 2 }}>
          <CardContent>
            <FormControl sx={{ p: 2, my: 1, mx: 1, width: '100%' }}>
              <InputLabel htmlFor='aboutMe'>About Me</InputLabel>
              <Input
                id='bio'
                name='bio'
                multiline
                minRows={5}
                placeholder='Tell everyone about yourself!'
                value={userInfo.bio || ''}
                onChange={handleChange}
                fullWidth
              />
            </FormControl>
          </CardContent>
        </Card>
        <Button type='submit'>Update</Button>
      </Stack>
    </Box>
  );
};

export default UserInfo;
