import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tags } from '@prisma/client';


import MarkDown from './MarkDown';
import Repo from './post creation/Repo';
import PostTagsChips from './PostTagsChips';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CheckIcon from '@mui/icons-material/Check';

const PostCreationPage = (): ReactElement => {
  const navigate = useNavigate();
  const [title, setTitle]: [string, Function] = useState('# ');
  const [body, setBody]: [string, Function] = useState('');
  const [titleFieldTooltip, setTitleFieldTooltip] = useState(false);
  const [bodyFieldTooltip, setBodyFieldTooltip] = useState(false);
  const [img, setImg]: [any, Function] = useState();
  const [cantSubmit, setCantSubmit]: [boolean, Function] = useState(false);
  const [repo, setRepo]: [{link: string, files: { path: string; contents: string }[]},Function] = useState({link:'', files:[]});
  const [currentTab, setCurrentTab] = useState('0');
  const [allPostTags, setAllPostTags]: [Tags[]|null, Function] = useState(null);
  const allPostTagsREF = useRef(allPostTags);
  const [selectedTags, setSelectedTags]: [Tags[], Function] = useState([]);

  useEffect(() => {
    axios.get('/api/tags/all/post')
      .then(({data}) => {
        setAllPostTags(data);
      })
  }, [allPostTagsREF])

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }

  const handleTextInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    switch (e.target.name) {
      case 'title': {setTitle(`# ${e.target.value}`); break;}
      case 'body': {setBody(e.target.value); break;}
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setImg(e.target.files![0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCantSubmit(true);
    axios.postForm('/api/posts', { title, body, img, tags: JSON.stringify(selectedTags), repo: btoa(JSON.stringify(repo)) })
      .then(({ data }) => {
        navigate('/dashboard');
    })
    .catch((err) => {
      console.error(err)
      setCantSubmit(false);
    });
  };

  const saveFile = (path: string, contents: string) => {
    setRepo({...repo, files: [...repo.files, {path, contents}]})
  };

  const saveRepo = (link: string) => {
    setRepo({...repo, link})
  };

  const handleTagSelect = (e: React.SyntheticEvent, newValue: Tags[]) => {
    setSelectedTags(newValue);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs />
      <Grid item md={8} xs={12}>
        <div className='glass-card'>
          <Grid container>
            <Grid item xs sx={{marginTop: 5, marginBottom: 5}}/>
            <Grid item xs={6} md={12} sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
              <Typography variant='h1' sx={{fontSize:50, fontWeight: 4}}>Create Post</Typography>
            </Grid>
            <Grid item xs/>
          </Grid>
          <Divider orientation='horizontal' variant='middle'/>
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} sx={{background: 'rgb(255, 255, 255, .25)', borderRadius: 2}}>
                <Tab label="Edit" value="0" sx={{color: 'aliceblue'}}/>
                <Tab label="Preview" value="1" sx={{color: 'aliceblue'}}/>
                <Tab label="Repo" value="2" sx={{color: 'aliceblue'}}/>
              </TabList>
            </Box>
            <TabPanel value="0">
              <Paper sx={{background: 'aliceblue', padding: 2}}>
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
                      <Button variant="contained" onClick={handleSubmit} disabled={cantSubmit} >Submit</Button>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </TabPanel>
            <TabPanel value="1">
              <Paper sx={{background: 'aliceblue', paddingX: 2, minHeight: '6rem'}}>
                <Stack>
                  <div className="fill">
                    {img ? <img src={URL.createObjectURL(img)} /> : <></>}
                  </div>
                  <MarkDown text={title} />
                  <PostTagsChips tags={selectedTags} />
                  <Divider orientation='horizontal' variant='middle' />
                  <MarkDown text={body} />
                </Stack>
              </Paper>
            </TabPanel>
            <TabPanel value="2">
              <Paper sx={{background: 'aliceblue', padding: 2}}>
                <Repo saveFile={saveFile} saveRepo={saveRepo}/>
              </Paper>
            </TabPanel>
          </TabContext>
        </div>
      </Grid>
      <Grid item xs />
      
    </Grid>
  );
};

export default PostCreationPage;
