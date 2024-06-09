import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Nav from './Nav';

interface User {
  id: number;
  email: string;
  sub: string;
  username: string;
  picture: string;
}

interface Post {
  userId: number;
  title: string;
  body: string;
}

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);

  // const getUser = (id: Number) => {
  //   axios
  //     .get(`/api/users/${id}`)
  //     .then(({ data }) => {
  //       setUser(data);
  //       getPosts(data.userId);
  //       console.log('user', data);
  //     })
  //     .catch((error) => console.error('Failed to get user:', error));
  // };
  useEffect(() => {
    const userId = user?.id;
    if (userId) {
      axios
        .get<Post[]>(`/api/posts/user/${userId}`)
        .then(({ data }) => {
          setPosts(data);
          console.log('posts', data);
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
        });
    }
  }, [user]);

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

  return (
    <div>
      <Nav />
      <h1>{user?.username} Profile Page</h1>
      {<img src={user?.picture} alt={user?.username} />}
      {posts.map((post, i) => (
        <div key={`${post}-${i}`}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
