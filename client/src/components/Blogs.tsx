import React, { useState, useContext, ReactElement } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';
import { UserContext } from './User';
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
  userId: number;
  author: string;
  title: string;
  body: string;
}

interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Blogs = (): ReactElement => {
  const { user, setUser } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = () => {
    axios
      .get(`https://dev.to/api/articles?username=${user}&per_page=8`)
      .then(({ data }) => {
        setBlogs(data);
        console.log(data);
      });
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <div>
        {blogs.map((blog, idx) => (
          <BlogItem key={`${blog}-${idx}`} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
