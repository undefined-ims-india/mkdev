import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Nav from './Nav';
import UserPosts from './UserPosts';
import { Typography } from '@mui/material';

interface User {
  id: number;
  firstName: string;
  email: string;
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

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);

  // const getUser = () => {
  //   axios
  //     .get(`/api/users/${id}`)
  //     .then(({ data }) => {
  //       setUser(data);
  //       console.log('user', data);
  //     })
  //     .catch((error) => console.error('Failed to get user:', error));
  // };
  // const getPosts = (userId: number) => {
  //   axios
  //     .get(`/api/posts/user/${userId}`)
  //     .then(({ data }) => {
  //       setPosts(data);
  //       console.log('userId', data);
  //     })
  //     .catch((error) => console.error("Failed to get user's posts:", error));
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);
  useEffect(() => {
    const id = 6;
    // const id = user?.id;
    axios
      .get(`/api/users/${id}`)
      .then(({ data }) => {
        setUser(data);
        // console.log('user', data);
      })
      .catch((error) => {
        console.error('Failed to get user:', error);
      });
  }, []);

  useEffect(() => {
    // const userId = user?.id;
    const userId = 6;
    if (userId) {
      axios
        .get<Post[]>(`/api/posts/user/${userId}`)
        .then(({ data }) => {
          setPosts(data);
          // console.log('posts', data);
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
        });
    }
  }, [user]);

  return (
    <div>
      <Nav />
      <h1>{user?.username}'s Profile Page</h1>
      {
        <img
          src={user?.picture}
          alt={user?.username}
          style={{ width: 100, height: 100 }}
        />
      }
      <div>
        <Typography align='center'> {user?.firstName}'s Posts</Typography>
        <UserPosts posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
