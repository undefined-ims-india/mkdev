import React, { ReactElement } from 'react';
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
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  const { con, select } = props;

  // pass selected conversation id to Messages component to change conId state
  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations): void => {
    select(e, newCon);
  }

  return (
    <div>
      {/* <button onClick={ (e)=> {selectConversation(e, con)} }>{ usersString.slice(0, usersString.length - 2) }</button> */}
      <button onClick={ (e)=> {selectConversation(e, con)} }>{ con.label }</button>
    </div>
  );
}

export default Conversation;
