import React, { useState, useEffect, useContext, ReactElement } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';

import { Conversations } from '@prisma/client';
import { Typography } from '@mui/material';

interface PropsType {
    con: Conversations;
    select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations | null) => void;
    setCons: () => void;
    deleteCon: () => void;
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  const { con, select, setCons, deleteCon } = props;

  const userId = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl); // for delete option TODO: change to delete button
  const [unreadMsgs, setUnreadMsgs] = useState<React.ReactNode>(0);
  // const [isHidden, setIsHidden] = useState<boolean | undefined>(true)

  // get number of unread messages in conversation
  useEffect(() => {
    axios
      .get(`/api/messages/unread/${con.id}/${userId}`)
      .then(({ data }): void => {
        console.log('data from conv unreadmsgs req', data)
        // if (data > 0) {
        //   setIsHidden(false);
        // }
        setUnreadMsgs(data);
      })
  }, [unreadMsgs, userId])

  // pass selected conversation id to Messages component to change conId state
  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations): void => {
    select(e, newCon);
    // disconnect newly read msgs from user
    axios
      .patch(`/api/users/read/${userId}/${con.id}`)
      .then(() => { setUnreadMsgs(0) })
      .catch((err) => {
        console.error('Failed to mark messages read:\n', err);
      })
  }

  const deleteConversation = () => {
    axios
      .delete(`/api/conversations/${con.id}`)
      .then(() => { deleteCon(); })
      .then(() => { setCons(); })
      .catch((err) => {
        console.error('Failed to delete conversation', err);
      });
  }

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    deleteConversation();
  }

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = (e: Event) => {
    setAnchorEl(null);
  }

  return (
    <Grid item>
      <Badge badgeContent={unreadMsgs} color="warning">
        <ButtonGroup
          sx={{
            width: '200px'
          }}
          variant='contained'
        >
          <Button
            fullWidth
            onClick={ (e)=> {selectConversation(e, con)} }
          >
            <Typography
              noWrap
              align='left'
            >
              { con.label }
            </Typography>
          </Button>
          <Button onClick={ handleMenu }>
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
      </Badge>
      <Popover
        open={open}
        anchorEl={ anchorEl }
        onClose={ handleCloseMenu }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper>
          <ClickAwayListener onClickAway={ handleCloseMenu }>
            <MenuList id="split-button-menu" autoFocusItem>
              <MenuItem
                onClick={(event) => handleOptionClick(event)}
              >
                Delete Conversation
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popover>
    </Grid>
  );
}

export default Conversation;
