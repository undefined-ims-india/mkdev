import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkDown from './MarkDown';
import Repo from './post creation/Repo';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';

const PostCreationPage = (): ReactElement => {
  const navigate = useNavigate();
  const [title, setTitle]: [string, Function] = useState('');
  const [body, setBody]: [string, Function] = useState('');
  const [titleFieldTooltip, setTitleFieldTooltip] = useState(false);
  const [bodyFieldTooltip, setBodyFieldTooltip] = useState(false);
  const [img, setImg]: [any, Function] = useState();
  const [cantSubmit, setCantSubmit]: [boolean, Function] = useState(false);
  const [repo, setRepo]: [{link: string, files: { path: string; contents: string }[]},Function] = useState({link:'', files:[]});


  const handleTextInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    let setStateFunc: Function;
    if (e.target.name === 'title') {
      if (titleFieldTooltip) {
        setTitleFieldTooltip(false);
      }
      setStateFunc = setTitle;
    } else if (e.target.name === 'body') {
      if (bodyFieldTooltip) {
        setBodyFieldTooltip(false);
      }
      setStateFunc = setBody;
    } else {
      return;
    }
    setStateFunc(e.target.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.files);
    setImg(e.target.files![0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCantSubmit(true);
    axios.postForm('/api/posts', { title, body, img, repo:btoa(JSON.stringify(repo)) })
      .then(({ data }) => {
        navigate('/dashboard');
    })
    .catch((err) => {
      setCantSubmit(false);
    });
  };

  const saveFile = (path: string, contents: string) => {
    setRepo({...repo, files: [...repo.files, {path, contents}]})
  };

  const saveRepo = (link: string) => {
    setRepo({...repo, link})
  };

  return (
    <div>
      <h1>Create Post</h1>
      <Box sx={{display:'flex', flexDirection: 'row'}}>
        <Stack>
          <Input
            id="image-upload"
            type="file"
            name="img"
            onChange={handleFile}
          />
          <Input
            id="post-title"
            type="text"
            value={title}
            onChange={handleTextInput}
            name="title"
            placeholder="Title"
          />
          <Input
            id="post-body"
            type="text"
            multiline
            value={body}
            onChange={handleTextInput}
            name="body"
            placeholder="Body Text"
            rows={4}
          />
          <Button onClick={handleSubmit} disabled={cantSubmit}>
            Submit
          </Button>
        </Stack>
        <Divider orientation='vertical' />
        <Stack>
          <MarkDown text={title} />
          <MarkDown text={body} />
        </Stack>
      </Box>
      <Divider />
      <Repo saveFile={saveFile} saveRepo={saveRepo}/>
    </div>
  );
};

export default PostCreationPage;
