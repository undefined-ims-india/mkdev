import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import Tags from './Tags';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const LoggedOutDrawerList = () => (
    <List>
      <ListItem>
        <ListItemButton onClick={() => navigate('/login')}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary='Log In' />
        </ListItemButton>
      </ListItem>
    </List>
  );

  const LoggedInDrawerList = () => (
    <List>
      <ListItem>
        <ListItemButton onClick={() => navigate(`/user/${user.id}/profile`)}>
          <ListItemIcon>
            <Avatar src={user.picture} />
          </ListItemIcon>
          <ListItemText primary='Your Profile' />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate('/messages')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary='Messages' />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate('/create-post')}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary='Create Post' />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary='Log Out' />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
       {isMobile && (
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor='left'
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
      >
        {!!user.id ? (
          <>
            <LoggedInDrawerList />
            <Divider />
            <Tags />
          </>
        ) : (
          <LoggedOutDrawerList />
        )}
      </Drawer>
    </Box>
  );
}
