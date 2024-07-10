import React, { useState, useContext, ReactElement } from 'react';
import { UserContext } from '../UserContext';
import { MessageWithMetadata } from '../../../../types';
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


interface PropsType {
  msg: MessageWithMetadata;
  getAllMsgs: () => void;
}

const Message: React.FC<PropsType> = ({ msg, getAllMsgs }): ReactElement => {
  const {
    id,
    body,
    liked,
    createdAt,
    senderId,
    sender
  } = msg;

  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const loggedInUser = useContext(UserContext).id;

  const handleLike = () => {
    axios
      .patch(`/api/messages/${id}`, {
        liked: !isLiked
      })
      .then(() => { setIsLiked(!isLiked) })
      .catch((err) => { console.error('Failed to change liked field', err) })
  }

  const handleDelete = () => {
    axios
      .delete(`/api/messages/${id}`)
      .then(() => {
        getAllMsgs();
      })
      .catch((err) => {
        console.error('Failed to delete message', err);
      });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        minWidth: '33%',
        maxWidth: '70%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pl: 1
        }}
      >
        <Avatar src={ sender.picture! }></Avatar>
          { loggedInUser === senderId ? (
              <IconButton onClick={ handleDelete }>
                <DeleteIcon fontSize='small'/>
              </IconButton>
            ) : (
              <IconButton onClick={ handleLike }>
                { isLiked ? <ThumbUpAltIcon fontSize='small'/> : <ThumbUpOffAltIcon fontSize='small'/> }
              </IconButton>
            )
          }
      </Box>
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <Typography align='right'>
          { sender.username }
        </Typography>
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            color:'white',
            background: '#349FDA',
            padding: 1
          }}
        >
          <Typography align='right'>
            { body }
          </Typography>
          <Typography variant="caption" align='right'>
          { dayjs(createdAt).calendar() }
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Message;
