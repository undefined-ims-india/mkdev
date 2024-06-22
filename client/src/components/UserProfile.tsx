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
import Link from '@mui/material/Link';
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
  const [tab, setTab] = useState('1');

  useEffect(() => {
    axios.get(`/api/users/${id}/profile`).then(({ data }): void => {
      setProfileData(data);
    });
  }, [profileDataREF]);

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
            <Typography
              gutterBottom
              variant='h1'
              textAlign='center'
              sx={{ fontFamily: 'fangsong', fontSize: '3rem' }}
            >
              {profileData!.username}
            </Typography>
            <Card sx={{ maxWidth: 300, margin: 'auto', mt: 3 }}>
              <Box display='flex' justifyContent='center' mb={2}>
                <Grid
                  container
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  spacing={3}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                      display='flex'
                      flexDirection='column'
                      alignItems='flex-start'
                    >
                      <Typography variant='body1'>
                        <Link
                          href={`https://www.linkedin.com/in/${
                            profileData!.linkedinId
                          }`}
                          target='_blank'
                        >
                          LinkedIn
                        </Link>
                      </Typography>
                      <Typography variant='body1'>
                        <Link
                          href={`https://dev.to/${profileData!.devId}`}
                          target='_blank'
                        >
                          Dev.to
                        </Link>
                      </Typography>
                      <Typography variant='body1'>
                        <Link
                          href={`https://github.com/${profileData!.githubId}`}
                          target='_blank'
                        >
                          Github
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Avatar
                        sx={{ width: 100, height: 100, mt: 2 }}
                        src={
                          profileData!.picture !== null
                            ? profileData!.picture
                            : ''
                        }
                        alt={profileData!.username || profileData!.name || ''}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box display='flex' justifyContent='center' mt={2} mb={2}>
                {userId === profileData!.id ? (
                  <Button onClick={handleEdit}>Edit</Button>
                ) : (
                  <Follow />
                )}
              </Box>
            </Card>
            <Box>
              <TabContext value={tab}>
                <Box display='flex' justifyContent='center' mt={10}>
                  <TabList onChange={handleTab} centered>
                    <Tab label='Posts' value='1' />
                    <Tab label='Dev.to Blogs' value='2' />
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
