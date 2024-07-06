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
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

interface UserProps {
  profileData: UserProfile;
  getProfile: () => void;
}

const ProfileTabs = ({ profileData, getProfile }: UserProps): ReactElement => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [tab, setTab] = useState('1');

  useEffect(() => {
    if (profileData && profileData.id) {
      axios
        .get(`/api/follows/counts/${profileData!.id}`)
        .then(({ data }): void => {
          setFollowerCount(data.followersCount);
          setFollowingCount(data.followingCount);
        });
    }
  }, [profileData]);

  const handleTab = (
    e: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setTab(value);
  };

  if (!profileData) {
    return (
      <Grid item xs={12}>
        <Box className='load-box'>
          <LinearProgress className='loading-bar' />
        </Box>
      </Grid>
    );
  }

  return (
    <Box>
      <TabContext value={tab}>
        <Box display='flex' justifyContent='center' mt={10}>
          <TabList
            onChange={handleTab}
            centered
            variant='fullWidth'
            sx={{
              '& .MuiTab-root': {
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '.9rem' },
                padding: { xs: '3px 6px', sm: '6px 12px' },
                minWidth: { xs: 50, sm: 70 },
              },
              '& .MuiTabs-flexContainer': {
                gap: '4px',
              },
            }}
          >
            <Tab label='Posts' value='1' />
            <Tab label='Blogs' value='2' />
            <Tab label={`Followers (${followerCount})`} value='3' />
            <Tab label={`Following (${followingCount})`} value='4' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Box display='flex' flexDirection='column' alignItems='center'>
            {profileData &&
              profileData!.posts.map((post) => (
                <Box
                  key={post.title + crypto.randomUUID()}
                  my={1}
                  width='50%'
                  sx={{
                    width: { xs: '90%', sm: '70%', md: '50%' },
                    justifyContent: 'center',
                  }}
                >
                  <Post content={post} refreshParent={getProfile} />
                </Box>
              ))}
          </Box>
        </TabPanel>
        <TabPanel value='2'>
          <Box sx={{ p: 3, flexGrow: 1, overflow: 'wrap' }}>
            <Blogs
              devId={profileData!.devId !== null ? profileData!.devId : ''}
              mediumId={
                profileData!.mediumId !== null ? profileData!.mediumId : ''
              }
            />
          </Box>
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
