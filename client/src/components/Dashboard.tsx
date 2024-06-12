import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import SearchComponent from './Search';
import UsersPost from './UsersPost';
import axios from 'axios';

const Dashboard = (): ReactElement => {

  const [feed, setFeed]:[{title:string, id:number, body:string, createdAt: string, author: string, userId:number}[], Function] = useState([]);
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
          <UsersPost post={post} />
        ))}
    </>
  );
};

export default Dashboard;
