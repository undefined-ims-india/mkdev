import React, { useState, useEffect, ReactElement, useRef } from 'react';
import axios from 'axios';
import Nav from './Nav';
import UserPosts from './UserPosts';
import Blogs from './Blogs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinId: string;
  githubId: string;
  devId: string;
  sub: string;
  username: string;
  picture: string;
  postCount: string;
}
interface Post {
  id: number;
  userId: number;
  author: string;
  title: string;
  body: string;
}

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [username, setUsername] = useState<string>('');
  const [devId, setDevId] = useState<string>('');
  const [githubId, setGithubId] = useState<string>('');
  const [linkedinId, setLinkedinId] = useState<string>('');
  const userRef = useRef(user);

  const [tab, setTab] = useState('1');

  const handleTab = (e: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  // get loggedIn user
  const getUser = () => {
    if (user) {
      axios
        .get('/api/users/loggedIn')
        .then(({ data }) => {
          setUser(data);
          setPostsCount(data.postsCount);
          setFollowersCount(data.followersCount);
          setUsername(data.username);
          setDevId(data.devId);
          setGithubId(data.githubId);
          setLinkedinId(data.linkedinId);
          console.log('user', data);
        })
        .catch((err) => {
          console.error('Failed to get user:', err);
        });
    }
  };

  const checkUsername = () => {
    return user.username === null || user.username === ''
      ? user.name
      : user.username;
  };

  const getPosts = () => {
    const userId = user?.id;
    if (userId) {
      axios
        .get<Post[]>(`/api/posts/user/${userId}`)
        .then(({ data }) => {
          setPosts(data);
        })
        .catch((err) => {
          console.error('Failed to fetch posts:', err);
        });
    }
  };
  useEffect(() => {
    setUsername(checkUsername());
    getPosts();
  }, [user]);

  useEffect(() => {
    getUser();
  }, [userRef]);

  return (
    <div>
      <Nav />
      {user && (
        <div>
          <h4>{`${username}`}</h4>
          <img
            src={user?.picture}
            alt={user?.name}
            style={{ width: 100, height: 100 }}
          />
          <p> LinkedIn: {user?.linkedinId}</p>
          <p>
            Dev.to:{' '}
            <a href={`https://dev.to/${user?.devId}`} target='blank' rel=''>
              {user?.devId}
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a
              href={`https://github.com/${user?.githubId}`}
              target='blank'
              rel=''
            >
              {user?.githubId}
            </a>
          </p>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTab} aria-label='lab API tabs example'>
                  <Tab label='Posts' value='1' />
                  <Tab label='Dev.to Blogs' value='2' />
                  <Tab label='Item Three' value='3' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                {<UserPosts posts={posts} getPosts={getPosts} />}
              </TabPanel>
              <TabPanel value='2'>{<Blogs devId={`${user.devId}`} />}</TabPanel>
              <TabPanel value='3'>'Potentially user information'</TabPanel>
            </TabContext>
            <div
              style={{
                border: '1px solid black',
                padding: 1,
                borderRadius: 12,
              }}
            ></div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Profile;
