import React, { useState, ReactElement } from 'react';
import axios from 'axios';
import MarkDown from '../MarkDown';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

const Repo = ({ saveFile, saveRepo }: {saveFile: Function, saveRepo: Function}): ReactElement => {
  const [tree, setTree]: [{ path: string }[], Function] = useState([]);
  const [repoLink, setRepoLink] = useState('');
  const [displayFile, setDisplayFile] = useState('');
  const [displayFilePath, setDisplayFilePath] = useState('');

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case 'repo-link':
        setRepoLink(e.target.value);
        break;
    }
  };

  const handleLookup = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    const { data }: { data: { path: string; type: string }[] } =
      await axios.get(`/api/repos/${repoLink.slice(19)}/tree`);
    setTree(data.filter(({ type }) => type === 'blob'));
    saveRepo(repoLink);
  };

  const changePath = async (
    e: React.MouseEvent<HTMLButtonElement> | any,
  ): Promise<void> => {
    const { data } = await axios.get(
      `/api/repos/${repoLink.slice(19)}/${e.target.name}/contents`,
    );
    setDisplayFile(`\`\`\`\n${data}\n\`\`\``);
    setDisplayFilePath(e.target.name);
  };

  return (
    <>
    <Box sx={{display:'flex', flexDirection: 'row'}}>
      <TextField value={repoLink} name="repo-link" onChange={handleTextInput} sx={{width: 1/3}}/>
      <Box sx={{display:'flex', flexDirection: 'column'}}>
        <Button onClick={handleLookup} size='small'>Add Repo</Button>
        <Button disabled={!tree.length || !displayFile.length} onClick={() => {saveFile(displayFilePath, displayFile)}}>Save file to post</Button>
      </Box>
    </Box>
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <List sx={{height: 600, overflow: 'scroll'}}>
          {tree.map((file, index) => (
            <ListItem key={index}>
              <Button onClick={changePath} name={file.path} sx={{fontSize: 12}}>
                {file.path}
              </Button>
            </ListItem>
          ))}
        </List>
      <Divider orientation='vertical' />
      <Paper sx={{height:600,overflow: 'scroll'}}>
        <MarkDown text={displayFile} />
      </Paper>
    </Box>
    </>
  );
};

export default Repo;
