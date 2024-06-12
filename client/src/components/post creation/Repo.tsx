import React, {useState, useEffect, ReactElement} from 'react';
import axios from 'axios';
import MarkDown from '../MarkDown';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

const Repo = ():ReactElement => {

  const [tree, setTree]: [{path:string}[], Function] = useState([]);
  const [username, setUsername] = useState('AlexPHebert2000');
  const [repoName, setRepoName] = useState('blackjack');
  const [displayFile, setDisplayFile] = useState('');

  const handleTextInput = (e:React.ChangeEvent<HTMLInputElement>):void => {
    switch(e.target.name) {
      case 'username': setUsername(e.target.value); break;
      case 'repo-name': setRepoName(e.target.value); break;
    }
  };

  const handleLookup = async (e:React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    const { data }: {data: {path:string, type:string}[]} = await axios.get(`/api/repos/${username}/${repoName}/tree`)
    setTree(data.filter(({type}) => type === 'blob'))
  };

  const changePath = async (e: React.MouseEvent<HTMLButtonElement> | any):Promise<void> => {
    const { data } = await axios.get(`/api/repos/${username}/${repoName}/${e.target.name}/contents`)
    setDisplayFile(`\`\`\`\n${data}\n\`\`\``);
  }

  return (
  <>
    <TextField value={username} name="username" onChange={handleTextInput} />
    <TextField value={repoName} name="repo-name" onChange={handleTextInput} />
    <Button onClick={handleLookup}>Add Repo</Button>
    <Box>
        <List>
          {tree.map((file, index) => (<ListItem key={index}><Button onClick={changePath} name={file.path}>{file.path}</Button></ListItem>))}
        </List>
        <MarkDown text={displayFile} />
      </Box>
  </>
  )
}

export default Repo;