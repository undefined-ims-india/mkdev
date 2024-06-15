import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';
import Nav from './Nav';
import Post from './Post';
import Blogs from './Blogs';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import Skeleton from '@mui/material/Skeleton';


const Profile = ():React.ReactElement => {

  const { id } = useParams();
  const [profileData, setProfileData]: [UserProfile | null, Function] = useState(null);
  const profileDataREF = useRef(profileData)
  const [tab, setTab] = useState('1');

  useEffect(() => {
    axios.get(`/api/users/${id}/profile`)
      .then(({data}):void => {
        setProfileData(data);
      })
  }, [profileDataREF])

  const handleTab = (e: React.SyntheticEvent<Element, Event>, value: string) => {
    setTab(value);
  };

  try {
    return (
      <>
        <Box>
          <h4>{profileData!.username}</h4>
          <Avatar
            src={profileData!.picture !== null ? profileData!.picture : ''}
            alt={profileData!.username !== null ? profileData!.username : profileData!.name !== null ? profileData!.name : ''}
          >
            {/*profileData!.username![0]*/}
          </Avatar>
          <p>LinkedIn</p>
          <p><a href={`https://dev.to/${profileData!.devId}`}>Dev.to</a></p>
          <p><a href={`https://github.com/${profileData!.githubId}`}>Github</a></p>
        </Box>
        <Box>
          <TabContext value={tab}>
            <Box>
              <TabList onChange={handleTab}>
                <Tab label='Posts' value='1'/>
                <Tab label='Dev.to BLogs' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              {profileData!.posts.map((post) => <Post key={post.title + crypto.randomUUID()} content={post} />)}
            </TabPanel>
            <TabPanel value='2'>
              <Blogs devId={profileData!.devId !== null ? profileData!.devId : ''} />
            </TabPanel>
          </TabContext>
        </Box>
      </>
    )
  }
  catch (err) {
    return (
      <>
        <Skeleton />
        <Skeleton variant='circular' width={50} height={50}/>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton variant='rectangular' height={500} />
      </>
    )
  }
}

export default Profile;