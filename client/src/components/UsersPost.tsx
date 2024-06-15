import React, { useState, ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
interface Post {
  id: string;
  author: string;
  title: string;
  body: string;
}

interface PostProps {
  post: Post;
  getPosts: () => void;
}

const UsersPost = ({ post, getPosts }: PostProps): ReactElement => {
  const [like, setLike] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });

  const handleLike = () => {
    setLike(!like);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const editPost = (e: any) => {
    e.preventDefault();

    axios
      .patch(`/api/posts/${post.id}`, editedPost)
      .then(({ data }) => {
        setEditedPost(data);
        setEdit(false);
      })
      .catch((err) => console.error(err));
  };

  const deletePost = () => {
    axios
      .delete(`/api/posts/${post.id}`)
      .then(() => getPosts())
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Card variant='outlined' style={{ margin: '20px 0' }}>
        <CardContent>
          {edit ? (
            <form onSubmit={editPost}>
              <Input
                type='text'
                name='title'
                value={editedPost.title}
                onChange={handlePostChange}
              />
              <textarea
                name='body'
                value={editedPost.body}
                onChange={handlePostChange}
              />
              <Button type='submit'>Save</Button>
            </form>
          ) : (
            <>
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
              <IconButton aria-label='Edit' onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UsersPost;
