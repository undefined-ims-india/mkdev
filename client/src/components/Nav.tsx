import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../styling/ThemeToggle';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/Inbox';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Nav = (): ReactElement => {
  const id = useContext(UserContext);
  const [profileImage, setProfileImage]: [string, Function] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  useEffect(() => {
    axios
      .get(`/api/users/${id}/image`)
      .then(({ data }): void => {
        setProfileImage(data.picture);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, [profileImage, id]);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Link to='/dashboard' style={{ textDecoration: 'none' }}>
          <Typography variant='h1' sx={{ fontSize: 36 }}>
            mkDev
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {!!id ? (
          <>
            <IconButton>
              <Link to='/create-post'>
                <AddBoxIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link to='/messages'>
                <InboxIcon />
              </Link>
            </IconButton>
            {profileImage.length ? (
              <button
                onClick={handleOpen}
                style={{ padding: 0, border: 'none', background: 'none' }}
              >
                <Avatar src={profileImage} />
              </button>
            ) : (
              <Skeleton variant='circular' />
            )}
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem>
                <Link to={`/user/${id}/profile`}>
                  <Button>Profile</Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to='/messages'>
                  <Button>Messages</Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to='/create-post'>
                  <Button>Create Post</Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to='/logout'>
                  <Button>Logout</Button>
                </Link>
              </MenuItem>
              <ThemeToggle />
            </Menu>
          </>
        ) : (
          <>
            <Link to='/login'>
              <Button>Login</Button>
            </Link>
            <ThemeToggle />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
