import React, { ReactElement } from 'react';

interface BlogProps {
  blog: any;
}

const BlogItem = ({ blog }: BlogProps): ReactElement => {
  return (
    <div>
      <p>{blog.title}</p>
    </div>
  );
};

export default BlogItem;
