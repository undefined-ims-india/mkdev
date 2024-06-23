import React, { useState, ReactElement, useEffect } from 'react';
import axios from 'axios';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

interface Blog {
  id: number;
  title: string;
  url: string;
  cover_image: string;
}
interface UserProps {
  devId: string;
  mediumId: string;
}

const Blogs = ({ devId, mediumId }: UserProps): ReactElement => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Dev.to Blogs
    axios
      .get(`https://dev.to/api/articles?username=${devId}&per_page=6`)
      .then(({ data }) => {
        setBlogs(data);
      })
      .catch((err) => console.error(err));

    // Medium Blogs
    axios
      .get(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumId}`
      )
      .then(({ data }) => {
        setBlogs((prevBlogs) =>
          prevBlogs.concat(
            data.items.map((blog: any) => ({
              id: blog.guid,
              title: blog.title,
              url: blog.link,
              cover_image: blog.thumbnail,
            }))
          )
        );
      })
      .catch((err) => console.error(err));
  }, [devId, mediumId]);

  return (
    <div>
      <Grid container spacing={4}>
        {blogs.map((blog, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component='img'
                height='140'
                image={blog.cover_image}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant='h1' component='h2' fontSize={'2rem'}>
                  <Link href={blog.url}>{blog.title}</Link>
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
