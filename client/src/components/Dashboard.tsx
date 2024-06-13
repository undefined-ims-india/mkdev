import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import SearchComponent from './Search';
import UsersPost from './UsersPost';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinId: string;
  githubId: string;
  sub: string;
  username: string;
  picture: string;
}
interface Post {
  id: number;
  author: string;
  userId: number;
  title: string;
  body: string;
}

interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
}

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
