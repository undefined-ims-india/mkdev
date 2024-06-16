import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import SearchComponent from './Search';
import Post from './Post';
import axios from 'axios';
import Sidebar from './Sidebar';
import Box  from '@mui/material/Box';
import { PostWithRelations } from '../../../types';
import Box from '@mui/material/Box';

const Dashboard = (): ReactElement => {

  const [feed, setFeed]:[PostWithRelations[], Function] = useState([]);
  const feedRef = useRef(feed)

  useEffect(() => {
    axios.get('/api/feed')
      .then(({data}) => {
        setFeed(data);
        console.log('hi')
      })
  }, [feedRef])

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <Nav />
        <h1>user dashboard page</h1>
        {user && (
          <div>
            <p>{`${`${username}`}`}</p>
            <img
              src={user?.picture}
              alt={user?.username}
              style={{ width: 100, height: 100 }}
            />
          </div>
        )}
      </Box>
      <SearchComponent />
        {feed.map((post) => (
          <Post key={post.id + post.title} content={post} />
        ))}
      </Box>
  );
};

export default Dashboard;
