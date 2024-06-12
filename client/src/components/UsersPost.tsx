import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
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
}

interface PostProps {
  post: Post;
  getPosts: () => void;
}

const UsersPost = ({ post, getPosts }: PostProps): React.ReactElement => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  const deletePost = () => {
    axios
      .delete(`/api/posts/${post.id}`)
      .then(() => {
        getPosts();
        console.log('Post deleted');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Card variant='outlined' style={{ margin: '20px 0' }}>
        <CardContent>
          {post.author}
          <Typography variant='h5' component='div'>
            {post.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {post.body}
          </Typography>
          <IconButton aria-label='Like' onClick={handleLike}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton aria-label='Delete' onClick={deletePost}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UsersPost;
