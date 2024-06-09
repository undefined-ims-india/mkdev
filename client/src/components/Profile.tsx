import React, { useState, useEffect, useRef, ReactElement } from 'react';
import axios from 'axios';
import Nav from './Nav';
// import UserPosts from './UserPosts';
interface User {
  userId: number;
  sub: string;
  name: string;
  picture: string;
}

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState([]);

  const getUser = () => {
    axios
      .get('/profile')
      .then(({ data }) => {
        setUser(data);
        getPosts(data);
        console.log('user', data);
      })
      .catch((error) => console.error('Failed to get user:', error));
  };

  const getPosts = (userId: number) => {
    if (user) {
      axios
        .get(`/api/posts/user/${userId}`)
        .then(({ data }) => {
          setPosts(data);
          console.log('userId', data);
        })
        .catch((error) => console.error("Failed to get user's posts:", error));
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // getPosts(user.userId);
  }, [user]);

  return (
    <div>
      <Nav />
      <div>
        <h1>{user?.name}</h1>
        <img
          src={user?.picture}
          alt={user?.name}
          style={{ width: 100, height: 100 }}
        />
      </div>

      {/* <UserPosts posts={posts} /> */}
    </div>
  );
};

export default Profile;

/*
useEffect(() => {
  getUser();
}, []);

 return (
  <div>
    <h1>{user?.name}</h1>
    <img src={user?.picture} alt={user?.name} />
  </div>
);
 */
