import * as React from 'react';

interface Post {
  title: string;
  body: string;
}
interface PostProps {
  post: Post;
}

const UsersPost = ({ post }: PostProps): React.ReactElement => {
  // console.log('post', post);
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
};

export default UsersPost;
