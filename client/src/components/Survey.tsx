import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface TagsResponse {
  id: number;
  tagType: 'User' | 'Post';
  name: string;
}

export default function Signup() {
  const [allUserTags, setUserTags] = useState<TagsResponse[]>([]);
  const [allPostTags, setPostTags] = useState<TagsResponse[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagsResponse[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
  };

  const getAllTags = async () => {
    try {
      const { data } = await axios.get('/api/tags/all');
      console.log('allmaps', data);

      // Assuming the response structure is { User: [], Post: [] }
      setUserTags(data.User || []);
      setPostTags(data.Post || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const toggleTag = (tag: TagsResponse) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Select User Tags</h2>
          {allUserTags.map(tag => (
            <div key={tag.id}>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedTags.includes(tag)} 
                  onChange={() => toggleTag(tag)} 
                />
                {tag.name}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h2>Select Post Tags</h2>
          {allPostTags.map(tag => (
            <div key={tag.id}>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedTags.includes(tag)} 
                  onChange={() => toggleTag(tag)} 
                />
                {tag.name}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
