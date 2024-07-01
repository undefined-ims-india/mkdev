import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../../types';
import Follow from './Follow';
import { UserContext } from '../UserContext';
import ProfileTabs from './ProfileTabs';
import Socials from './Socials';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import UserInfo from './UserInfo';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

const Profile = (): React.ReactElement => {
  const userId = useContext(UserContext);
  const { id } = useParams();
  const [profileData, setProfileData]: [UserProfile | null, Function] =
    useState(null);
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(null);
  const [edit, setEdit] = useState(false);
  const profileDataREF = useRef(profileData);

  const getProfile = () => {
    axios
      .get(`/api/users/${id}/profile`)
      .then(({ data }): void => setProfileData(data))
      .catch((err) => console.error('Failed to get user:', err));
  };

  useEffect(getProfile, [profileDataREF]);

  const handleEdit = () => setEdit(true);

  const UpdateUserInfo = (userInfo: UserProfile) => {
    axios
      .patch(`/api/users/${userInfo.id}`, userInfo)
      .then(({ data }): void => {
        setUserInfo(data);
      })
      .catch((error) => console.error('Error updating user info:', error));
    setEdit(false);
    setProfileData(userInfo);
  };

  try {
    return (
      <>
        {edit ? (
          <UserInfo
            UpdateUserInfo={UpdateUserInfo}
            profileData={profileData!}
          />
        ) : (
          <>
            <Typography
              gutterBottom
              variant='h1'
              textAlign='center'
              sx={{ fontFamily: 'Roboto', fontSize: '3rem' }}
            >
              {profileData!.username}
            </Typography>
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
                    <Box
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                    >
                      <Avatar
                        sx={{ width: 100, height: 100, mt: 2 }}
                        src={
                          profileData!.picture !== null
                            ? profileData!.picture
                            : ''
                        }
                        alt={profileData!.username || profileData!.name || ''}
                      />
                      <Box display='flex' justifyContent='center' mt={2} mb={2}>
                        {userId === profileData!.id ? (
                          <Button onClick={handleEdit}>Edit</Button>
                        ) : (
                          <Follow />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            <Box>
              <Socials profileData={profileData!} />
            </Box>
            <ProfileTabs profileData={profileData!} getProfile={getProfile} />
          </>
        )}
      </>
    );
  } catch (err) {
    return (
      <>
        <Skeleton />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton variant='rectangular' height={500} />
      </>
    );
  }
};

export default Profile;
