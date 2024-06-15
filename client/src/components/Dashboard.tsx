import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import SearchComponent from './Search';
import Post from './Post';
import axios from 'axios';
import { PostWithRelations } from '../../../types';

const Dashboard = (): ReactElement => {

  const [feed, setFeed]:[PostWithRelations[], Function] = useState([]);
  const feedRef = useRef(feed)

  useEffect(() => {
    axios.get('/api/feed')
      .then(({data}) => {
        setFeed(data);
      })
  }, [feedRef])

  return (
    <>
      <Nav />
      <SearchComponent />
        {feed.map((post) => (
          <Post content={post} />
        ))}
    </>
  );
};

export default Dashboard;
