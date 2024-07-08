import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import axios from 'axios';
import { useTheme } from '@mui/material';
import io from 'socket.io-client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/Inbox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';

const socket = io('http://localhost:4000');

const Nav = (): ReactElement => {
  const {userId, userImage} = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unreadMsgs, setUnreadMsgs] = useState<React.ReactNode>(0);
  const [isHidden, setIsHidden] = useState<boolean | undefined>(true)
  const open = !!anchorEl;
  const navigate = useNavigate();
  const theme = useTheme().palette.mode;

  // count total unread messages for logged in user
  useEffect(() => {
    axios
      .get(`/api/users/unread/${userId}`)
      .then(({ data }): void => {
        if (data > 0) {
          setIsHidden(false);
        }
        setUnreadMsgs(data);
      })
  }, [unreadMsgs])

  socket.on('read-message', () => {
    setUnreadMsgs(0);
  })

  socket.on('message', (message) => {
    setUnreadMsgs(() => unreadMsgs + message.newMessage);
  })

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar enableColorOnDark sx={{
          backgroundColor: theme === 'light' ? 'rgba(90, 217, 219, .3)' : 'rgba(51, 34, 77, .6)',
          backdropFilter: 'blur(14px) saturate(180%)',
          zIndex: '10',
          height: '70px'
        }} >
        <Toolbar disableGutters>
          <Grid container spacing={2} sx={{paddingX: 2}}>
            <Grid item xs={2}>
              <Box sx={{display: 'flex', flexDirection:'row', justifyContent:'start', alignItems:'center', marginX: 2}}>
                <Button onClick={() => {navigate('/dashboard')}} >
                  <img src="/img/mkdev-logo-square.gif" alt="mkdev logo" style={{height: '60px', width: '60px'}}/>
                </Button>
              </Box>
            </Grid>
            <Grid item lg={8} xs={4} />
            <Grid item lg={2} xs={6}>
              <Box sx={{display: 'flex', flexDirection:'row', justifyContent:'end', alignItems:'center', height: '100%'}}>
                {!!userId ?
                  (
                    <>
                      <IconButton onClick={() => {navigate('/create-post')}}>
                        <AddBoxIcon fontSize="medium" />
                        <Typography variant='h1' sx={{fontSize: 20}}>Create Post</Typography>
                      </IconButton>
                      <IconButton onClick={() => {navigate('/messages')}} sx={{color: 'aliceblue'}}>
                        <Badge badgeContent={unreadMsgs} invisible={isHidden} color="warning">
                          <InboxIcon fontSize="medium" />
                        </Badge>
                        <Typography variant='h1' sx={{fontSize: 20}}>Inbox</Typography>
                      </IconButton>
                      <Button onClick={handleOpen} sx={{ padding: 0, border: 'none', background: 'none' }}>
                        <Avatar src={userImage}/>
                      </Button>
                      <Menu open={open} anchorEl={anchorEl} onClose={handleClose} sx={{zIndex: 11}}>
                        <MenuItem>
                          <Button onClick={() => { navigate(`/user/${userId}/profile`)}}>Profile</Button>
                        </MenuItem>
                        <MenuItem>
                          <Button onClick={() => { navigate(`/messages`)}}>Messages</Button>
                        </MenuItem>
                        <MenuItem>
                          <Button onClick={() => { navigate(`/create-post`)}}>Create Post</Button>
                        </MenuItem>
                        <MenuItem>
                          <Button onClick={() => { navigate(`/logout`)}}>Logout</Button>
                        </MenuItem>
                        <ThemeToggle />
                      </Menu>
                    </>
                  )
                :
                  (
                    <>
                      <Button onClick={() => {navigate('/login')}} size='large'>Login</Button>
                      <ThemeToggle />
                    </>
                  )
                }
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
