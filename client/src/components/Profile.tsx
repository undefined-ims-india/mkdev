import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Nav from './Nav';
import UserPosts from './UserPosts';
import { Typography, Box } from '@mui/material';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  github: string;
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

  useEffect(() => {
    axios
      .get('/profile')
      .then(({ data }) => {
        setUser(data);
        // console.log('user', data);
      })
      .catch((error) => {
        console.error('Failed to get user:', error);
      });
  }, []);

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

  const getUser = () => {
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
  };
  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <div>
      <Nav />
      <h1>{user?.username}'s Profile</h1>
      <div>{/* <p>{user?.aboutMe}</p> */}</div>
      <p>{`${user?.firstName} ${user?.lastName}`}</p>
      <img
        src={user?.picture}
        alt={user?.username}
        style={{ width: 100, height: 100 }}
      />
      <p>{user?.linkedIn}LinkedIn Link</p>
      <p>{user?.github}Github Link</p>
      <div
        style={{
          border: '1px solid black',
          padding: 1,
          borderRadius: 12,
        }}
      >
        {/* <Typography align='center'>{user?.firstName}'s Posts</Typography> */}
        <UserPosts posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
