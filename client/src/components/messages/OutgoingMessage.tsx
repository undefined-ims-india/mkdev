import React, { useState, ReactElement } from 'react';
import { useTheme } from '@mui/material';
import { MessageWithMetadata } from '../../../../types';
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
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
    sender
  } = msg;

  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const theme = useTheme();

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
        <IconButton onClick={ handleDelete }>
          <DeleteIcon fontSize='small'/>
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        <Typography align='right'>
          { sender.username }
        </Typography>
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            flexGrow: 1,
            background: '#00ff884d',
            padding: 1
          }}
        >
          <Typography align='left' color={ theme.palette.text.secondary }>
            { body }
          </Typography>
        </Paper>
        <Typography align='right' variant='caption'>
        { dayjs(createdAt).calendar() }
        </Typography>
      </Box>
    </Box>
  );
}

export default Message;
