import React, {useState, ReactElement} from 'react';
import axios from 'axios';
import MarkDown from '../MarkDown';

import Box from '@mui/material/Box';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Repo = ():ReactElement => {

  const [tree, setTree]: [{path:string}[], Function] = useState([]);
  const [username, setUsername] = useState('AlexPHebert2000');
  const [repoName, setRepoName] = useState('blackjack');
  const [displayFile, setDisplayFile] = useState('');
  const [displayFilePath, setDisplayFilePath] = useState('');
  const [fileSave, setFileSave]: [{path:string, contents:string}[], Function] = useState([]);

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
    setDisplayFilePath(e.target.name);
  };

  const saveFile = async (e:React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    const file = {path: displayFilePath, contents: displayFile}
    setFileSave((cur:{path:string, contents:string}[]) => {cur.push(file)})
  };

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
        <Button onClick={saveFile} >Save file to post</Button>
      </Box>
  </>
  )
}

export default Repo;