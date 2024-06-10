
import React, { useState, ReactElement, useEffect } from 'react';
import axios from 'axios';
import UsersPost from './UsersPost';
import { PortalProps } from '@mui/material';
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

interface ProfileProps {
  posts: Post[];
}

const UserPosts = ({ posts }: ProfileProps): ReactElement => {
  return (
    <>
      {posts.map((post: any) => (
        <UsersPost key={post.id} post={post} />
      ))}
    </>
  );
};

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const response = await axios.get(`/posts/user/${userId}`);
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch user posts:', error);
//         // Here you can handle the error, for example, set an error state
//       }
//     };

//     getPosts();
//   }, [userId]);
//   return (
//     <>
//       {posts.map((post) => (
//         <UsersPost key={post.id} post={post} />
//       ))}
//     </>
//   );
// };

// export default UserPosts;
