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
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleIcon from '@mui/icons-material/Article';

const Profile = (): React.ReactElement => {
  const userId = useContext(UserContext);
  const { id } = useParams();
  const [profileData, setProfileData]: [UserProfile | null, Function] =
    useState(null);
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [edit, setEdit] = useState(false);
  const profileDataREF = useRef(profileData);
  const [tab, setTab] = useState('1');

  const getProfile = () => {
    axios
      .get(`/api/users/${id}/profile`)
      .then(({ data }): void => setProfileData(data));
  };

  useEffect(getProfile, [profileDataREF]);

  useEffect(() => {
    axios.get(`/api/follows/counts/${id}`).then(({ data }): void => {
      setFollowerCount(data.followersCount);
      setFollowingCount(data.followingCount);
    });
  }, [id]);

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
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  justifyContent={'space-evenly'}
                >
                  <Typography variant='body1'>
                    <Link
                      href={`https://www.linkedin.com/in/${
                        profileData!.linkedinId
                      }`}
                      target='_blank'
                      title='LinkedIn Profile'
                    >
                      <LinkedInIcon fontSize='large' />
                    </Link>
                  </Typography>
                  <Typography variant='body1'>
                    <Link
                      href={`https://github.com/${profileData!.githubId}`}
                      target='_blank'
                      title='GitHub Profile'
                    >
                      <GitHubIcon fontSize='large' />
                    </Link>
                  </Typography>
                  <Typography variant='body1'>
                    <Link
                      href={`https://dev.to/${profileData!.devId}`}
                      target='_blank'
                      title='Dev.to Profile'
                    >
                      <ArticleIcon fontSize='large' />
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Card>
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
                    devId={
                      profileData!.devId !== null ? profileData!.devId : ''
                    }
                    mediumId={
                      profileData!.mediumId !== null
                        ? profileData!.mediumId
                        : ''
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
