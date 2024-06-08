import React, { useState, useEffect, useRef, ReactElement } from 'react';
import axios from 'axios';
import Nav from './Nav';
// import UserPosts from './UserPosts';
interface User {
  userId: number;
  name: string;
  picture: string;
}

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState([]);
  const userRef = useRef(user);
  const postsRef = useRef(posts);

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
    if (user) {
      getPosts(user.userId);
    }
  }, [user]);

  return (
    <div>
      <Nav />
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: 100, height: 100 }}
          />
        </div>
      )}
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
