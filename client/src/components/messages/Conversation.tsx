import React, { useState, useRef, ReactElement } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { Conversations } from '@prisma/client';

interface PropsType {
    con: Conversations;
    select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations | null) => void;
    setCons: () => void;
    deleteCon: () => void;
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  const { con, select, setCons, deleteCon } = props;

  // const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // pass selected conversation id to Messages component to change conId state
  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations): void => {
    select(e, newCon);
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

  const open = Boolean(anchorEl);

  return (
    <>
      <ButtonGroup>
        <Button onClick={ (e)=> {selectConversation(e, con)} }>{ con.label }</Button>
        <Button onClick={ handleMenu }>
          <MoreVertIcon />
        </Button>
      </ButtonGroup>
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

    </>
  );
}

export default Conversation;
