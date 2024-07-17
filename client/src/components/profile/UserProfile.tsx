import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../../types';
import ProfileTabs from './ProfileTabs';
import ProfileInfo from './ProfileInfo';
import AboutMe from './AboutMe';
import UserInfo from './UserInfo';
import ProfileTags from './ProfileTags';

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import { UserContext } from '../UserContext';

const Profile = (): React.ReactElement => {
  const { id: loggedInUserId } = useContext(UserContext);
  const { id: profileUserId } = useParams<{ id: string }>();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(null);

  const getProfile = () => {
    const userId = profileUserId || loggedInUserId;
    axios
      .get(`/api/users/${userId}/profile`)
      .then(({ data }) => setProfileData(data))
      .catch((err) => console.error('Failed to get user:', err));
  };

  useEffect(() => {
    getProfile();
  }, [profileUserId, loggedInUserId]);

  const handleEdit = () => {
    setEdit(true);
  };

  const updateUserInfo = (userInfo: UserProfile) => {
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '100%',
            p: 3,
          }}
        >
          <Card sx={{ maxWidth: 750, width: '100%' }}>
            <CardContent>
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
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ProfileInfo
                      profileData={profileData!}
                      handleEdit={handleEdit}
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <AboutMe
                      profileData={profileData!}
                      getProfile={getProfile}
                      updateUserInfo={updateUserInfo}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Modal open={edit} onClose={handleEdit}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 900,
                bgcolor: 'background.paper',
                border: '2px solid',
                boxShadow: 24,
                p: 2,
              }}
            >
              <UserInfo
                updateUserInfo={updateUserInfo}
                profileData={profileData!}
              />
              <Box>
                <ProfileTags
                  savedTags={profileData!.tags}
                  refreshParent={getProfile}
                />
              </Box>
            </Box>
          </Modal>
        </Box>
        <Box>
          <ProfileTabs profileData={profileData!} getProfile={getProfile} />
        </Box>
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
