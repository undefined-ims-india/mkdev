import React, { ReactElement, useState, useCallback, useContext, useEffect } from 'react';
import { Tags } from '@prisma/client';
import { useNavigate } from 'react-router-dom';

import Repo from './Repo';
import InputTab from './InputTab';
import FullPost from '../full post/FullPost';
import { UserContext } from '../../UserContext';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';


const PostCreationPage = (): ReactElement => {

  const user = useContext(UserContext);
  const [title, setTitle]: [string, Function] = useState('# ');
  const [body, setBody]: [string, Function] = useState('');
  const [img, setImg]: [any, Function] = useState();
  const [repo, setRepo]: [{link: string, files: { path: string; contents: string }[]},Function] = useState({link:'', files:[]});
  const [currentTab, setCurrentTab] = useState('0');
  const [selectedTags, setSelectedTags]: [Tags[], Function] = useState([]);
  const navigate = useNavigate();

  const paperStyling = { padding: 2, minHeight: '6rem'};

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }

  const handleTextInput = useCallback(async (
      e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): Promise<void> => {
      switch (e.target.name) {
        case 'title': {await setTitle(`# ${e.target.value}`); break;}
        case 'body': {await setBody(e.target.value); break;}
      }
    }, [title, body]
  );

  const handleTagSelect = useCallback(async (
    e: React.SyntheticEvent, newValue: Tags[]) => {
      await setSelectedTags(newValue);
    }, [selectedTags]
  );

  const handleFile = useCallback((
    e: React.ChangeEvent<HTMLInputElement>): void => {
      setImg(e.target.files![0]);
  }, [img]);

  const saveFile = (path: string, contents: string) => {
    setRepo({...repo, files: [...repo.files, {path, contents}]})
  };

  const saveRepo = (link: string) => {
    setRepo({...repo, link})
  };

  useEffect(() => {
    if (user.id < 1) { navigate('/dashboard')}
  }, [])

  const content = { title, body, img, selectedTags, repo};
  const handlers = { handleFile, handleTagSelect, handleTextInput}

  return (
    <Grid container spacing={0}>
      <Grid item xs />
      <Grid item md={8} xs={12} className='glass-card'>
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
              <Tab label="Repo" value="1" sx={{color: 'aliceblue'}}/>
              <Tab label="Preview" value="2" sx={{color: 'aliceblue'}}/>
            </TabList>
          </Box>
          <TabPanel value="0">
            <InputTab content={content} handlers={handlers} paperStyling={paperStyling}/>
          </TabPanel>
          <TabPanel value="1">
            <Paper sx={paperStyling}>
              <Repo saveFile={saveFile} saveRepo={saveRepo}/>
            </Paper>
          </TabPanel>
          <TabPanel value="2">
            <FullPost
              content={{
                title,
                body,
                author: user,
                repo: {...repo, id: 0, postId: 0, files: repo.files.map(file => ({...file, id: 0, repoId: 0, createdAt: new Date(Date.now()), star: false}))},
                tags: selectedTags,
                liked: undefined, likedByUser: undefined, comments: undefined, id: undefined, createdAt: new Date(Date.now())
              }}
              imageLink={img ? URL.createObjectURL(img) : ''}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default PostCreationPage;
