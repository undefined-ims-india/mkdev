import React, { useState, ReactElement, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

interface User {
  devId: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
}
interface UserProps {
  devId: string;
}

const Blogs = ({ devId }: UserProps): ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async () => {
    axios
      .get(`https://dev.to/api/articles?username=${devId}&per_page=6`)
      .then(({ data }) => {
        setBlogs(data);
      });
  };
  useEffect(() => {
    getBlogs();
  }, [user.devId]);

  return (
    <div>
      <Typography variant='h4' component='h1' gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component='img'
                height='140'
                image={blog.cover_image}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  <a href={blog.url}>{blog.title}</a>
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {blog.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Blogs;
