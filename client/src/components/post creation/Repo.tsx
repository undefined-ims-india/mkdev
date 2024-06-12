import React, { useState, ReactElement } from 'react';
import axios from 'axios';
import MarkDown from '../MarkDown';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Repo = ({ saveFile, saveRepo }: {saveFile: Function, saveRepo: Function}): ReactElement => {
  const [tree, setTree]: [{ path: string }[], Function] = useState([]);
  const [repoLink, setRepoLink] = useState('https://github.com/AlexPHebert2000/blackjack');
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
      <TextField value={repoLink} name="repo-link" onChange={handleTextInput} />
      <Button onClick={handleLookup}>Add Repo</Button>
      <Box>
        <List>
          {tree.map((file, index) => (
            <ListItem key={index}>
              <Button onClick={changePath} name={file.path}>
                {file.path}
              </Button>
            </ListItem>
          ))}
        </List>
        <MarkDown text={displayFile} />
        <Button onClick={() => {saveFile(displayFilePath, displayFile)}}>Save file to post</Button>
      </Box>
    </>
  );
};

export default Repo;
