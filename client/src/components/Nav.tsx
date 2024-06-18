import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../styling/ThemeToggle';
import axios from 'axios';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const Nav = (): ReactElement => {

  const id = useContext(UserContext);
  const [profileImage, setProfileImage]: [string, Function] = useState('null');
  useEffect(() => {
    axios.get(`/api/users/${id}/image`)
      .then(({data}):void => {
        setProfileImage(data.picture);
        console.info(data)
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, [profileImage, id])

  return (
    <Box sx={{display: 'flex', flexDirection:'row', alignItems:'center', width: '100%', justifyContent: 'space-between'}}>
      <Box>
        <Link to='/dashboard' style={{textDecoration: 'none'}}>
          <Typography variant='h1' sx={{fontSize: 36}}>mkDev</Typography>
        </Link>
      </Box>
      <Box sx={{display: 'flex', flexDirection:'row'}}>
        {!!id ?
        <>
          <Link to={`/user/${id}/profile`}>
            <Button>Profile</Button>
          </Link>
          <Link to='/messages'>
            <Button>Messages</Button>
          </Link>
          <Link to='/create-post'>
            <Button>Create Post</Button>
          </Link>
          <Link to='/logout'>
            <Button>Logout</Button>
          </Link>
          <Avatar src={profileImage} >?</Avatar>
        </>
        :
        <Link to='/login'>
            <Button>Login</Button>
          </Link>
        }
      <ThemeToggle />
      </Box>
    </Box>
  );
};

export default Nav;
