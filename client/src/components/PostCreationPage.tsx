import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkDown from './MarkDown'

import {
  Tooltip,
  Button,
  TextField,
  Stack,
  Divider,
  FormControl,
  Input,
  InputLabel
} from '@mui/material';

const PostCreationPage = () :ReactElement => {

  const navigate = useNavigate();
  const [title, setTitle]: [string, Function] = useState('');
  const [body, setBody]: [string, Function] = useState('');
  const [titleFieldTooltip, setTitleFieldTooltip] = useState(false);
  const [bodyFieldTooltip, setBodyFieldTooltip] = useState(false);
  const [file, setFile]: [any, Function] = useState();

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
    setFile(e.target.files![0]);
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
          <Button type='submit' >Submit</Button>
        </FormControl>
      </form>
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