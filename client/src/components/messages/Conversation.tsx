import React, { useState, useContext, useRef, ReactElement } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import ConversationDelConf from './ConversationDelConf';
import io from 'socket.io-client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';

import { Typography } from '@mui/material';
import { ConversationWithParticipants } from '../../../../types';

const socket = io('http://localhost:4000');

interface PropsType {
  con: ConversationWithParticipants;
  visibleCon: React.MutableRefObject<number>;
  display: string;
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: ConversationWithParticipants | null) => void;
  setCons: () => void;
  deleteCon: () => void;
}

const Conversation: React.FC<PropsType> =
  ({
    con,
    visibleCon,
    display,
    select,
    setCons,
    deleteCon
  }): ReactElement => {

  const user = useContext(UserContext);
  const [unreadMsgsTotal, setUnreadMsgsTotal] = useState<React.ReactNode>(0);
  const [isHidden, setIsHidden] = useState<boolean | undefined>(false) // badge in view
  const [showDelConfirm, setShowDelConfirm] = useState<boolean>(false);
  const visibleConRef = useRef(visibleCon)

  const generateConversationLabel = (con: ConversationWithParticipants): string => {
    if (con.participants) {
      let label = '';
      for (let i = 0; i < con.participants.length; i++) {
        if (con.participants[i].id !== user.id) {
          label += `${con.participants[i].username}, `
        }
      }
      return label.slice(0, label.length - 2)
    } else {
      return '';
    }
  }
  const [label, setLabel] = useState(generateConversationLabel(con));

  const getUnreadMsgsTotal = (conversationId: number, userId: number): void=> {
    if (con.id) {
      axios
        .get(`/api/messages/unread/${conversationId}/${userId}`)
        .then(({ data }): void => {
          setUnreadMsgsTotal(data);
        })
        .catch((err) => {
          console.error(`Failed to get unread message total for conversation ${con.id}:`, err);
        })
    }
  }
  // get unread message total on initial render
  getUnreadMsgsTotal(con.id, user.id);

  const markAllMsgsRead = (userId: number, conId: number): void => {
    axios
      .patch(`/api/users/read/${userId}/${conId}`)
      .then(() => {
        // setUnreadMsgsTotal(0);
        // send socket event to change inbox notification badge
        socket.emit('read-message', {})
      })
      .then(() => {
        getUnreadMsgsTotal(conId, userId);
      })
      .catch((err) => {
        console.error('Failed to mark messages read:\n', err);
      })
  }

  socket.on('message', (message) => {
    const visibleCon: number = visibleConRef.current.current;
    // if a conversation is in view
    if (visibleCon) {
      // and an incoming message is not in that conversation
      if (visibleCon !== message.conversationId) {
        // get unread message total for that conversation
        getUnreadMsgsTotal(con.id, user.id);
      } else {
        // don't show badge, mark all as read
        try {
          // setIsHidden(true);
          markAllMsgsRead(user.id, con.id);
          // setUnreadMsgsTotal(0);
        } catch {
          console.error('Unable to mark all messages read when conversation is currently in view');
        } finally {
          getUnreadMsgsTotal(con.id, user.id);
        }
      }
    } else { // no conversation is in view
      getUnreadMsgsTotal(con.id, user.id);
    }
  })

  // pass selected conversation id to Messages component, set selected conversation as visible
  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: ConversationWithParticipants): void => {
    select(e, newCon);
    markAllMsgsRead(user.id, con.id);
  }

  // show delete conversation confirmation dialog
  const handleDelete = () => {
    setShowDelConfirm(true);
  }

  // close delete conversation confirmation dialog
  const handleClose = () => {
    setShowDelConfirm(false);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            pl: 0
          }}
        >
          <Button
            variant='text'
            sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}
            onClick={ (e)=> {selectConversation(e, con)} }
          >
            <Typography
              noWrap
              align='left'
            >
              { label }
            </Typography>
          </Button>
          <Badge badgeContent={ unreadMsgsTotal } invisible={ isHidden }color="warning">
            <Button
              id={ display === 'mobile' ? 'delete-conversation-mobile' : 'delete-conversation'}
              onClick={ handleDelete }
            >
              <ClearIcon />
            </Button>
          </Badge>
        </Box>
      </Box>
      <ConversationDelConf con={ con } setCons={ setCons } deleteCon={ deleteCon } handleClose={ handleClose } hidden={ showDelConfirm }/>
    </Box>
  );
}

export default Conversation;
