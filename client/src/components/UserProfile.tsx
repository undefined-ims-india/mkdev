import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';
import Post from './Post';
import Blogs from './Blogs';
import Followers from './Followers';
import Following from './Following';
import Follow from './Follow';
import { UserContext } from './UserContext';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import Skeleton from '@mui/material/Skeleton';
import UserInfo from './UserInfo';
import Button from '@mui/material/Button';

const Profile = (): React.ReactElement => {
  const userId = useContext(UserContext);
  const { id } = useParams();
  const [profileData, setProfileData]: [UserProfile | null, Function] =
    useState(null);
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(null);
  const [edit, setEdit] = useState(false);
  const profileDataREF = useRef(profileData);
  const [tab, setTab] = useState('1');

  useEffect(() => {
    axios
      .get(`/api/users/${id}/profile`)
      .then(({ data }): void => setProfileData(data));
  }, [profileDataREF]);

  const handleEdit = () => setEdit(true);

  const UpdateUserInfo = (userInfo: UserProfile) => {
    axios
      .patch(`/api/users/${userInfo.id}`, userInfo)
      .then(({ data }): void => setUserInfo(data))
      .catch((error) => console.error('Error updating user info:', error));
    setEdit(false);
    setProfileData(userInfo);
  };

  const handleTab = (
    e: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setTab(value);
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
            {userId === profileData!.id && (
              <Button onClick={handleEdit}>Edit Profile</Button>
            )}
            <Box>
              <h4>{profileData!.username}</h4>
              <Avatar
                sx={{ width: 80, height: 80 }}
                src={profileData!.picture !== null ? profileData!.picture : ''}
                alt={profileData!.username || profileData!.name || ''}
              ></Avatar>
              <Follow />
              <p>
                <a
                  href={`https://www.linkedin.com/in/${
                    profileData!.linkedinId
                  }`}
                >
                  LinkedIn
                </a>
              </p>
              <p>
                <a href={`https://dev.to/${profileData!.devId}`}>Dev.to</a>
              </p>

              <p>
                <a href={`https://github.com/${profileData!.githubId}`}>
                  Github
                </a>
              </p>
            </Box>
            <Box>
              <TabContext value={tab}>
                <Box>
                  <TabList onChange={handleTab}>
                    <Tab label='Posts' value='1' />
                    <Tab label='Dev.to BLogs' value='2' />
                    <Tab label='Followers' value='3' />
                    <Tab label='Following' value='4' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  {profileData!.posts.map((post) => (
                    <Post
                      key={post.title + crypto.randomUUID()}
                      content={post}
                    />
                  ))}
                </TabPanel>
                <TabPanel value='2'>
                  <Blogs
                    devId={
                      profileData!.devId !== null ? profileData!.devId : ''
                    }
                  />
                </TabPanel>
                <TabPanel value='3'>{<Followers />}</TabPanel>
                <TabPanel value='4'>{<Following />}</TabPanel>
              </TabContext>
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
