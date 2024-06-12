import React, { ReactElement, useEffect } from 'react';
import UsersPost from './UsersPost';

interface User {
  id: number;
  firstName: string;
  lastName: string;
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

interface PostProps {
  posts: Post[];
  getPosts(): void;
}

const UserPosts = ({ posts, getPosts }: PostProps): ReactElement => {
  return (
    <>
      {posts.map((post: any) => (
        <UsersPost key={post.id} post={post} getPosts={getPosts} />
      ))}
    </>
  );
};

export default UserPosts;
