import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import MarkDown from './MarkDown';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
  id: number;
  userId: number;
  author: string;
  title: string;
  body: string;
  createdAt: string;
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
          {post.author}
          <Typography> {dayjs(post.createdAt).fromNow()} </Typography>
          <MarkDown text={post.title} />
          <MarkDown text={post.body} />
          <IconButton aria-label='Like' onClick={handleLike}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UsersPost;
