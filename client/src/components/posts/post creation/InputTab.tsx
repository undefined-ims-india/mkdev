import React from 'react';
import axios from 'axios';
import { Tags } from '@prisma/client';
import { SxProps } from '@mui/material';

import SubmitButton from './SubmitButton';

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'


export default ({handlers, content, paperStyling, mode = 'post', id} :
  {
    handlers: {
      handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
      handleTextInput: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => Promise<void>,
      handleTagSelect: (e: React.SyntheticEvent, newValue: Tags[]) => Promise<void>
    },
    content : {
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
      },
    }
    paperStyling: SxProps | undefined,
    mode?: 'edit' | 'post'
    id?: number | string,
  }) => {

  const { title, body, selectedTags, img} = content;
  const { handleFile, handleTagSelect, handleTextInput} = handlers;
  const [allPostTags, setAllPostTags]: [Tags[]|null, Function] = React.useState(null);
  const allPostTagsREF = React.useRef(allPostTags);

  React.useEffect(() => {
    axios.get('/api/tags/all/post')
      .then(({data}) => {
        setAllPostTags(data);
      })
  }, [allPostTagsREF])

  return (
    <Paper sx={paperStyling}>
    <Stack>
      <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
        <InputLabel htmlFor='img-upload'>
          <Button variant='contained' component="span">Add Cover Image</Button>
        </InputLabel>
        <TextField
          type='file'
          sx={{display: 'none'}}
          id='img-upload'
          onChange={handleFile}
        />
        <CheckIcon fontSize='large' sx={{color: img ? 'green' : 'silver'}} />
      </Box>
      <Input
        id="post-title"
        type="text"
        value={title.slice(2)}
        onChange={handleTextInput}
        name="title"
        placeholder="Title"
        sx={{marginY: 2}}
        />
      <Input
        id="post-body"
        type="text"
        multiline
        value={body}
        onChange={handleTextInput}
        name="body"
        placeholder="Body Text"
        rows={30}
      />
      <Box sx={{marginY: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        {allPostTags ?
          <Box sx={{flexGrow: 1}}>
            <Autocomplete
            multiple
            options={allPostTags}
            value={selectedTags}
            onChange={handleTagSelect}
            getOptionLabel={(tag: Tags) => tag.name}
            renderInput={(params) => (
              <TextField
              {...params}
              label="Tags"
              placeholder={ selectedTags.length ? 'Choose more tags' : 'Choose tags to categorize your post'}
              />
            )}
            />
          </Box>
          :
          <></>
        }
        <Box sx={{margin: 2}}>
          <SubmitButton {...content} mode={mode} id={id} />
        </Box>
      </Box>
    </Stack>
  </Paper>
  )
}