import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios';

interface TagsResponse {
  id: number;
  tagType: 'User' | 'Post';
  name: string;
}

const Tags = () => {
  const [userTags, setUserTags] = useState<TagsResponse[]>([]);

  const getUserTags = async () => {
    try {
      const { data } = await axios.get('/api/tags');
      setUserTags(data.tags);
    } catch (error) {
      console.error('Error fetching user tags:', error);
    }
  };

  useEffect(() => {
    getUserTags();
  }, []);

  return (
    <div>
      <Chip label='testing' />
      {userTags.map((tag) => (
        <Chip key={tag.id} label={tag.name} />
      ))}
    </div>
  );
};

export default Tags;
