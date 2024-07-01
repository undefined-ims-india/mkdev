import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../../types';
import ProfileTabs from './ProfileTabs';
import ProfileInfo from './ProfileInfo';

import Skeleton from '@mui/material/Skeleton';
import UserInfo from './UserInfo';
import Typography from '@mui/material/Typography';

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
            <ProfileInfo profileData={profileData!} handleEdit={handleEdit} />
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
