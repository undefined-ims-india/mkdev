import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

interface PropsType {
    con: {
      id: number;
      participants: { name: string }[];
    };
    // select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number) => void;
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  // const { id, select } = props;
  const { con } = props;

  const usersString = con.participants.reduce((acc, curr) => {
    return acc.concat(`${curr.name}, `)
  }, '');

  // pass selected conversation id to Messages component to change conId state
  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number): void => {
    // select(e, newId);
  }

  return (
    <div>
      {/* <button onClick={ (e)=> {selectConversation(e, id)} }>Conversation {con.id}</button> */}
      <button>{ usersString.slice(0, usersString.length - 2) }</button>
    </div>
  );
}

export default Conversation;
