import React, { ReactElement } from 'react';
import UsersPost from './UsersPost';
interface Post {
  id: number;
  title: string;
  body: string;
}
interface ProfileProps {
  posts: Post[];
}

const UserPosts = ({ posts }: ProfileProps): ReactElement => {
  console.log('posts', posts);
  return (
    <>
      {posts.map((post) => (
        <UsersPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default UserPosts;
