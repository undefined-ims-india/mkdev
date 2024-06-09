import React, { useState, ReactElement, useEffect } from 'react';
import axios from 'axios';
import UsersPost from './UsersPost';
import { PortalProps } from '@mui/material';
interface User {
  id: number;
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

interface ProfileProps {
  posts: Post[];
}

const UserPosts = ({ posts }: ProfileProps): ReactElement => {
  // const [posts, setPosts] = useState([]);

  return (
    <>
      {posts.map((post: any) => (
        <UsersPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default UserPosts;
