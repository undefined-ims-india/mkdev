import * as React from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';
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
    <Container>
      <Card variant='outlined' style={{ margin: '20px 0' }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {post.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {post.body}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UsersPost;
