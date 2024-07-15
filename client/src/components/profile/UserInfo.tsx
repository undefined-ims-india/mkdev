import React, { useState } from 'react';
import { UserProfile } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

interface UserInfoProps {
  profileData: UserProfile;
  updateUserInfo: (userInfo: UserProfile) => void;
}

const UserInfo = ({
  profileData,
  updateUserInfo,
}: UserInfoProps): React.ReactElement => {
  const theme = useTheme().palette.mode;
  const navigate = useNavigate();
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(profileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdate = (e: React.FormEvent): void => {
    e.preventDefault();
    updateUserInfo(userInfo!);
  };

  const handleCancel = () => {
    navigate(0);
  };

  const changeTheme = theme === 'light' ? 'black' : 'primary.main';

  return (
    <Container>
      <Box component='form' sx={{ p: 1, m: 1 }} onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <FormControl
                sx={{
                  p: 2,
                  my: 0.5,
                  mx: 0.5,
                  width: '50%',
                  fontFamily: 'SomeType',
                }}
              >
                <InputLabel sx={{ color: changeTheme }} htmlFor='username'>
                  Username
                </InputLabel>
                <Input
                  id='username'
                  name='username'
                  value={userInfo!.username || ''}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                sx={{
                  p: 2,
                  my: 0.5,
                  mx: 0.5,
                  width: '50%',
                  fontFamily: 'SomeType',
                }}
              >
                <InputLabel sx={{ color: changeTheme }} htmlFor='githubId'>
                  Github Username
                </InputLabel>
                <Input
                  id='githubId'
                  name='githubId'
                  value={userInfo!.githubId || ''}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                sx={{
                  p: 2,
                  my: 0.5,
                  mx: 0.5,
                  width: '50%',
                  fontFamily: 'SomeType',
                }}
              >
                <InputLabel sx={{ color: changeTheme }} htmlFor='devId'>
                  Dev.to Username
                </InputLabel>
                <Input
                  id='devId'
                  name='devId'
                  value={userInfo!.devId || ''}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                sx={{
                  p: 2,
                  my: 0.5,
                  mx: 0.5,
                  width: '50%',
                  fontFamily: 'SomeType',
                }}
              >
                <InputLabel sx={{ color: changeTheme }} htmlFor='mediumId'>
                  Medium Username
                </InputLabel>
                <Input
                  id='mediumId'
                  name='mediumId'
                  value={userInfo!.mediumId || ''}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                sx={{
                  p: 2,
                  my: 0.5,
                  mx: 0.5,
                  width: '50%',
                  fontFamily: 'SomeType',
                }}
              >
                <InputLabel sx={{ color: changeTheme }} htmlFor='linkedinId'>
                  LinkedIn Username
                </InputLabel>
                <Input
                  id='linkedinId'
                  name='linkedinId'
                  value={userInfo!.linkedinId || ''}
                  onChange={handleChange}
                />
              </FormControl>
              <Box display='flex' justifyContent='center' gap={4}>
                <Button type='button' onClick={handleCancel} color='error'>
                  Cancel
                </Button>
                <Button type='submit' color='primary' variant='contained'>
                  Update
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            {/* Bio */}
            <Paper elevation={3} sx={{ p: 2, m: 2, maxWidth: 600 }}>
              <Typography
                variant='h1'
                fontSize={'1.5rem'}
                sx={{ mb: 2, fontFamily: 'SomeType', color: changeTheme }}
              >
                Bio
              </Typography>
              <FormControl
                sx={{ width: '100%', fontFamily: 'SomeType', fontSize: '1rem' }}
              >
                <Input
                  id='bio'
                  name='bio'
                  multiline
                  minRows={2}
                  placeholder='This is the Bio'
                  value={userInfo!.bio || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </FormControl>
            </Paper>
            {/* About Me */}
            <Paper elevation={3} sx={{ p: 2, m: 2, maxWidth: 600 }}>
              <Typography
                variant='h1'
                fontSize={'1.5rem'}
                sx={{ mb: 2, fontFamily: 'SomeType', color: changeTheme }}
              >
                About Me
              </Typography>
              <FormControl sx={{ width: '100%', fontFamily: 'SomeType' }}>
                <Input
                  id='aboutMe'
                  name='aboutMe'
                  multiline
                  minRows={5}
                  placeholder='This is the about me'
                  value={userInfo!.aboutMe || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserInfo;
