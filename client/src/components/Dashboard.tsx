import React, { ReactElement, useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Container from '@mui/material/Container';
interface User {
  id: number;
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

  // * The real get user function. DO NOT REMOVE!
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
  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <div>
      <Nav />
      <h1>user dashboard page</h1>
      {user && (
        <div>
          <p>{`${user?.username}`}</p>
          <img
            src={user?.picture}
            alt={user?.username}
            style={{ width: 100, height: 100 }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
