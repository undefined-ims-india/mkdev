import React, { useState, ReactElement, useEffect } from 'react';
import axios from 'axios';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

interface Blog {
  id: number;
  title: string;
  url: string;
  cover_image: string;
  description: string;
}
interface UserProps {
  devId: string;
  mediumId: string;
}

const Blogs = ({ devId, mediumId }: UserProps): ReactElement => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs([]);
    // Dev.to Blogs
    const getDev = () => {
      axios
        .get(`https://dev.to/api/articles?username=${devId}&per_page=6`)
        .then(({ data }) => {
          setBlogs((prevBlogs) => [...prevBlogs, ...data]);
        })
        .catch((err) => console.error(err));
    };
    // Medium Blogs
    const getMedium = () => {
      axios
        .get(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumId}&per_page=6`
        )
        .then(({ data }) => {
          const medBlogs = data.items.map((blog: any) => ({
            id: blog.guid,
            title: blog.title,
            description: blog.description,
            url: blog.link,
            cover_image: blog.thumbnail,
          }));
          setBlogs((prevBlogs) => [...prevBlogs, ...medBlogs]);
        })
        .catch((err) => console.error(err));
    };

    if (devId) {
      getDev();
    }
    if (mediumId) {
      getMedium();
    }
  }, [devId, mediumId]);

  return (
    <Box>
      <Grid container spacing={4}>
        {blogs.length === 0 ? (
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
        ) : (
          blogs.map((blog, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4}>
              <Card>
                <Link href={blog.url} style={{ textDecoration: 'none' }}>
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
        )}
      </Grid>
    </Box>
  );
};

export default Blogs;
