import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkDown from './MarkDown'
import Repo from './post creation/Repo';

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

const PostCreationPage = () :ReactElement => {

  const navigate = useNavigate();
  const [title, setTitle]: [string, Function] = useState('');
  const [body, setBody]: [string, Function] = useState('');
  const [titleFieldTooltip, setTitleFieldTooltip] = useState(false);
  const [bodyFieldTooltip, setBodyFieldTooltip] = useState(false);
  const [img, setImg]: [any, Function] = useState();
  const [canSubmit, setCanSubmit]: [boolean, Function] = useState(false);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) :void => {
    let setStateFunc :Function
    if (e.target.name === 'title') {
      if (titleFieldTooltip) {setTitleFieldTooltip(false);}
      setStateFunc = setTitle;
      }
    else if (e.target.name === 'body') {
      if (bodyFieldTooltip) {setBodyFieldTooltip(false);}
      setStateFunc = setBody;
    }
    else {
      return;
    }
    setStateFunc(e.target.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(e.target.files)
    setImg(e.target.files![0]);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()
    setCanSubmit(true)
    axios.postForm('/api/posts', {title, body, img})
      .then(({data}) => {
        navigate('/dashboard');
      })
  }

  return (
  <div>
    <h1>Create Post</h1>
    <Stack>
      <form action="/api/posts" method="POST" encType='multipart/form-data'>
        <FormControl>
          <Input id="image-upload" type="file" name="img" onChange={handleFile} />
          <Input id="post-title"
              type="text"
              value={title}
              onChange={handleTextInput}
              name="title"
              placeholder="Title"
              />
            <Input id="post-body"
              type="text"
              multiline
              value={body}
              onChange={handleTextInput}
              name="body"
              placeholder="Body Text"
              rows={4}
              />
          <Button onClick={handleSubmit} disabled={canSubmit}>Submit</Button>
        </FormControl>
      </form>
      <Repo />
      <Divider />
      <Stack>
        <MarkDown text={title} />
        <MarkDown text={body} />
      </Stack>
    </Stack>
  </div>
  )
}

export default PostCreationPage;