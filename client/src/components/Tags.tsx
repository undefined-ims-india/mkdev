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

  const handleClick = (e: any) => {
    console.log(e.target.key, 'YOU CLICKED!!');
    // axios.delete(`/api/tags/${}`)
  };

  return (
    <div>
      <Chip onClick={handleClick} label='testing' />
      {userTags.map((tag) => (
        <Chip onClick={handleClick} key={tag.id} label={tag.name} />
      ))}
    </div>
  );
};

export default Tags;
