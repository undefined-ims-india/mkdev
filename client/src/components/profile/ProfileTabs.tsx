import React, { useEffect, useState, ReactElement } from 'react';
import axios from 'axios';
import { UserProfile } from '../../../../types';
import Post from '../Post';
import Blogs from './Blogs';
import Followers from './Followers';
import Following from './Following';

import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

interface UserProps {
  profileData: UserProfile;
  getProfile: () => void;
}

const ProfileTabs = ({ profileData, getProfile }: UserProps): ReactElement => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [tab, setTab] = useState('1');

  useEffect(() => {
    axios
      .get(`/api/follows/counts/${profileData.id}`)
      .then(({ data }): void => {
        setFollowerCount(data.followersCount);
        setFollowingCount(data.followingCount);
      });
  }, [profileData.id]);

  const handleTab = (
    e: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setTab(value);
  };

  return (
    <Box>
      <TabContext value={tab}>
        <Box display='flex' justifyContent='center' mt={10}>
          <TabList onChange={handleTab} centered>
            <Tab label='Posts' value='1' />
            <Tab label='Dev.to Blogs' value='2' />
            <Tab label={`Followers (${followerCount})`} value='3' />
            <Tab label={`Following (${followingCount})`} value='4' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          {profileData!.posts.map((post) => (
            <Post
              key={post.title + crypto.randomUUID()}
              content={post}
              refreshParent={getProfile}
            />
          ))}
        </TabPanel>
        <TabPanel value='2'>
          <Blogs
            devId={profileData!.devId !== null ? profileData!.devId : ''}
            mediumId={
              profileData!.mediumId !== null ? profileData!.mediumId : ''
            }
          />
        </TabPanel>
        <TabPanel value='3'>
          <Box display='flex' justifyContent='center'>
            <Followers />
          </Box>
        </TabPanel>
        <TabPanel value='4'>
          <Box display='flex' justifyContent='center'>
            <Following />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileTabs;
