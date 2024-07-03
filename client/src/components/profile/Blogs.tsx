import React, { useState, ReactElement, useEffect } from 'react';
import axios from 'axios';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import { BlogPosts } from '../../../../types';
import Box from '@mui/material/Box';

interface UserProps {
  devId: string;
  mediumId: string;
}

const Blogs = ({ devId, mediumId }: UserProps): ReactElement => {
  const [blogs, setBlogs] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Exit early if no devId or mediumId to prevent loading non-user's blogs
    if (!devId && !mediumId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setBlogs([]);

    const getDev = async () => {
      try {
        const { data } = await axios.get(
          `https://dev.to/api/articles?username=${devId}&per_page=6`
        );
        setBlogs((prevBlogs) => [...prevBlogs, ...data]);
      } catch (error) {
        console.error(error);
      }
    };

    const getMedium = async () => {
      try {
        const { data } = await axios.get(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumId}&per_page=6`
        );
        const medBlogs = data.items.map((blog: any) => ({
          id: blog.guid,
          title: blog.title,
          description: blog.description,
          url: blog.link,
          cover_image: blog.thumbnail,
        }));
        setBlogs((prevBlogs) => [...prevBlogs, ...medBlogs]);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([getDev(), getMedium()]).finally(() => setLoading(false));
  }, [devId, mediumId]);

  return (
    <Box>
      <Grid container spacing={4}>
        {loading ? (
          <Grid item xs={12}>
            <Typography align='center'>Loading...</Typography>
          </Grid>
        ) : blogs.length ? (
          blogs.map((blog, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4}>
              <Card>
                <Link href={blog.url} target='_blank'>
                  <CardMedia
                    component='img'
                    image={blog.cover_image}
                    alt={blog.title}
                  />
                </Link>
                <CardContent>
                  <Typography
                    variant='h1'
                    component='h2'
                    fontSize={'2rem'}
                    align='center'
                  >
                    {blog.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant='h1'
              component='h2'
              fontSize={'1rem'}
              align='center'
            >
              No Blogs Found
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Blogs;
