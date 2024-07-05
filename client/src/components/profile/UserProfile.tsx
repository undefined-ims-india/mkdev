import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../../types';
import ProfileTabs from './ProfileTabs';
import ProfileInfo from './ProfileInfo';

import Skeleton from '@mui/material/Skeleton';
import UserInfo from './UserInfo';
import AboutMe from './AboutMe';
import Box from '@mui/material/Box';

const Profile = (): React.ReactElement => {
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
      .then(({ data }) => setProfileData(data))
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 1, md: 2 },
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '960px',
                  mx: 'auto',
                }}
              >
                <Box
                  sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                >
                  <ProfileInfo
                    profileData={profileData!}
                    handleEdit={handleEdit}
                  />
                </Box>
                <Box
                  sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                >
                  <AboutMe
                    profileData={profileData!}
                    getProfile={getProfile}
                    UpdateUserInfo={UpdateUserInfo}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <ProfileTabs profileData={profileData!} getProfile={getProfile} />
            </Box>
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
