import React, { useState, useContext, ReactElement, useEffect } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinId: string;
  githubId: string;
  devId: string;
  sub: string;
  username: string;
  picture: string;
  postCount: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  url: string;
}
interface UserProps {
  devId: string;
}

const Blogs = ({ devId }: UserProps): ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async () => {
    axios
      .get(`https://dev.to/api/articles?username=${devId}&per_page=5`)
      .then(({ data }) => {
        setBlogs(data);
        console.log(data);
      });
  };
  useEffect(() => {
    getBlogs();
  }, [user.devId]);

  return (
    <div>
      <h1>Blog Posts</h1>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <a href={blog.url}>Click here to keep reading!</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
