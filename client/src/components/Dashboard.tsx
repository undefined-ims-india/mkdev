import React, { ReactElement, useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Sidebar from './Sidebar';
import Box  from '@mui/material/Box';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinId: string;
  githubId: string;
  sub: string;
  username: string;
  picture: string;
}
interface Post {
  id: number;
  author: string;
  userId: number;
  title: string;
  body: string;
}

interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Dashboard = (): ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [username, setUsername] = useState<string>('');

  const getUser = () => {
    if (user) {
      axios
        .get('/api/users/loggedIn')
        .then(({ data }) => {
          setUser(data);
          setPostsCount(data.postsCount);
          setFollowersCount(data.followersCount);
        })
        .catch((error) => {
          console.error('Failed to get user:', error);
        });
    }
  };

  const checkUsername = () => {
    return user.username === null || user.username === ''
      ? user.name
      : user.username;
  };

  useEffect(() => {
    setUsername(checkUsername());
    getUser();
  }, [user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <Nav />
        <h1>user dashboard page</h1>
        {user && (
          <div>
            <p>{`${`${username}`}`}</p>
            <img
              src={user?.picture}
              alt={user?.username}
              style={{ width: 100, height: 100 }}
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
