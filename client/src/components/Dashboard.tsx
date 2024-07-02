import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import SearchComponent from './Search';
import Post from './Post';
import axios from 'axios';
import Sidebar from './Sidebar';
import { PostWithRelations } from '../../../types';
import Box from '@mui/material/Box';

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
      <Box component='main' sx={{ flexGrow: 1, p: 3, overflow: 'wrap'}}>
        <SearchComponent />
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          {feed.map((post) => (
            <Box  key={post.id + post.title} sx={{width: '50vw', minWidth: 300, marginY:2 }}>
              <Post content={post} refreshParent={getFeed} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
