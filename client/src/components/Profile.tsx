import React, { useState, useEffect, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import UserPosts from './UserPosts';
import Blogs from './Blogs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  userId: number;
  author: string;
  title: string;
  body: string;
}

interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [username, setUsername] = useState<string>('');

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

  const checkUsername = () => {
    return user.username === null || user.username === ''
      ? user.name
      : user.username;
  };

  useEffect(() => {
    setUsername(checkUsername());
  }, [user]);

  // const getPosts = () => {
  //   axios
  //     .get(`/api/posts/user/${user?.id}`)
  //     .then(({ data }) => {
  //       setPosts(data);
  //       console.log('posts', data);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to fetch posts:', error);
  //     });
  // };
  // useEffect(() => {
  //   getPosts();
  // }, [user]);

  return (
    <div>
      <Nav />
      {user && (
        <div>
          <p>{`${username}`}</p>
          <img
            src={user?.picture}
            alt={user?.name}
            style={{ width: 100, height: 100 }}
          />
          <p>{user?.linkedinId} LinkedIn Link</p>
          <p>{user?.githubId} Github Link</p>
          <div
            style={{
              border: '1px solid black',
              padding: 1,
              borderRadius: 12,
            }}
          >
            <UserPosts posts={posts} />
          </div>
          {/* <Blogs /> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
