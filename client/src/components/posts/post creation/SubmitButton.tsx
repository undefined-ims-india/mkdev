import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Tags } from '@prisma/client';

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

export default ({title, body, img, selectedTags, repo} :
  {
    title: string,
    body: string,
    img: any,
    selectedTags: Tags[],
    repo: {
      link: string;
      files: {
        path: string;
        contents: string;
      }[];
    }
  }) => {

  const navigate = useNavigate();
  const [cantSubmit, setCantSubmit] = React.useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCantSubmit(true);
    axios.postForm('/api/posts', { title, body, img, tags: JSON.stringify(selectedTags), repo: btoa(JSON.stringify(repo)) })
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error(err)
        setCantSubmit(false);
      });
  };

  return (
    <Tooltip disableFocusListener title={
      ((title.length > 2) ? (body.length) ? (selectedTags.length) ? '' : 'Please tag your post with relevant topics' : 'Please add body text' : 'Please add a title')
    }>
      <span>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={(cantSubmit || body.length <= 0 || title.length <= 2 || selectedTags.length <= 0)}
          >
          Submit
        </Button>
      </span>
    </Tooltip>
  )
}