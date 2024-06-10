import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';

const Blogs = (): ReactElement => {
  const [blogs, setBlogs] = useState([]);

  // React.useEffect(() => {
  //   getBlogs();
  // }, [blogs]);

  const getBlogs = (username: string) => {
    axios
      .get(`https://dev.to/api/articles?username=${username}&per_page=8`)
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
