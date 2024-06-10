
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
  title: string;
  body: string;
}
interface PostProps {
  post: Post;
}

const UsersPost = ({ post }: PostProps): React.ReactElement => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

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
          <IconButton aria-label='Like' onClick={handleLike}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UsersPost;
