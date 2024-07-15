import React, { useState, ReactElement } from 'react';
import { useTheme } from '@mui/material';
import { MessageWithMetadata } from '../../../../types';
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

import axios from 'axios';

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
        minWidth: '33%',
        maxWidth: '70%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pr: 1
        }}
      >
        <Avatar src={ sender.picture! }></Avatar>
        <IconButton onClick={ handleLike }>
          { isLiked ? <ThumbUpAltIcon fontSize='small'/> : <ThumbUpOffAltIcon fontSize='small'/> }
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <Typography>
          { sender.username }
        </Typography>
        <Paper
          elevation={2}
          sx={{
            background: '#00ff8899',
            padding: 1
          }}
        >
          <Typography color={ theme.palette.text.secondary }>
            { body }
          </Typography>
        </Paper>
        <Typography variant="caption">
        { dayjs(createdAt).calendar() }
        </Typography>
      </Box>
    </Box>
  );
}

export default Message;
