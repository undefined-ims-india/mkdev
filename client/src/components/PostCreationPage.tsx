import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkDown from './MarkDown'

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'

const PostCreationPage = () :ReactElement => {

  const navigate = useNavigate();
  const [title, setTitle]: [string, Function] = useState('# ');
  const [body, setBody]: [string, Function] = useState('');
  const [titleFieldTooltip, setTitleFieldTooltip] = useState(false);
  const [bodyFieldTooltip, setBodyFieldTooltip] = useState(false);
  const [file, setFile]: [any, Function] = useState();

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) :void => {
    let setStateFunc :Function
    if (e.target.name === 'Post Title') {
      if (titleFieldTooltip) {setTitleFieldTooltip(false);}
      setStateFunc = setTitle;
      }
    else if (e.target.name === 'Post Body') {
      if (bodyFieldTooltip) {setBodyFieldTooltip(false);}
      setStateFunc = setBody;
    }
    else {
      return;
    }
    setStateFunc(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!title.length || !body.length) {
      if (!title.length) {setTitleFieldTooltip(true);}
      if (!body.length) {setBodyFieldTooltip(true);}
      return
    }
    const newPost:{title:string, body:string, file:any} = {title, body, file};
    axios.post('/api/posts', {newPost})
      .then(() :void => {
        navigate('/dashboard')
      })
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(e.target.files)
    setFile(e.target.files![0]);
  }

  return (
  <div>
    <h1>Create Post</h1>
    <Stack>
      <Stack>
        <input type='file' accept='image/*' onChange={handleFile} />
        <Tooltip title="Please provide a title" open={titleFieldTooltip} enterDelay={500} leaveDelay={200}>
          <TextField
            value={title}
            onChange={handleTextInput}
            name="Post Title"
            placeholder="Title"
            />
          </Tooltip>
        <Tooltip title="Please provide some body text" open={bodyFieldTooltip} enterDelay={500} leaveDelay={200}>
          <TextField
            multiline
            value={body}
            onChange={handleTextInput}
            name="Post Body"
            placeholder="Body Text"
            rows={4}
            />
        </Tooltip>
        <Button onClick={handleSubmit} >Submit</Button>
      </Stack>
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