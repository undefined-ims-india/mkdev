import React, { useState, useRef, ReactElement } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { Conversations } from '@prisma/client';

interface PropsType {
    con: Conversations;
    select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations) => void;
    setCons: () => void;
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  const { con, setCons, select } = props;

  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  // pass selected conversation id to Messages component to change conId state
  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations): void => {
    select(e, newCon);
  }

  const deleteConversation = () => {
    axios
      .delete(`/api/conversations/${con.id}`)
      .then(() => { setCons(); }) // getAllConversations from props
      .catch((err) => {
        console.error('Failed to delete conversation', err);
      });
  }

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    deleteConversation();
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  }

  const handleClose = (e: Event) => {
    setOpen(false);
  }

  return (
    <>
      <ButtonGroup
        ref={ anchorRef }
      >
        <Button onClick={ (e)=> {selectConversation(e, con)} }>{ con.label }</Button>
        <Button onClick={ handleToggle }>
          <MoreVertIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={ handleClose }>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem
                    onClick={(event) => handleOptionClick(event)}
                  >
                    Delete Conversation
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default Conversation;
