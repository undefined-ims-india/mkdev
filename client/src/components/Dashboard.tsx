import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import SearchComponent from './Search';
import Post from './Post';
import axios from 'axios';
import Sidebar from './Sidebar';
import { PostWithRelations } from '../../../types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Dashboard = (): ReactElement => {

  const [feed, setFeed]:[PostWithRelations[], Function] = useState([]);
  const feedRef = useRef(feed)

  const getFeed = () => {
    axios.get('/api/feed')
      .then(({data}) => {
        setFeed(data);
    });
  };

  useEffect(getFeed, [feedRef])

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3}}>
        <Nav />
        <SearchComponent />
        <Grid container>
          {feed.map((post) => (
            <>
              <Grid item xs={0} lg={2} />
              <Grid item xs={12} lg={8}>
                <Post key={post.id + post.title} content={post} refreshParent={getFeed} />
              </Grid>
              <Grid item xs={0} lg={2} />
            </>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
