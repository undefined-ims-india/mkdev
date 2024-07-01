import React, { useState, ReactElement } from 'react';
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

const Message: React.FC<PropsType> = (props): ReactElement => {
  const { getAllMsgs } = props;
  const { id, body, liked, createdAt, sender } = props.msg;

  const [isLiked, setIsLiked] = useState<boolean>(liked);

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
    <Box>
      <Box>
        <Avatar src={ sender.picture! }></Avatar>
        <Typography>
          { sender.username }
        </Typography>
        <Typography>
          { dayjs(createdAt).calendar() }
        </Typography>
      </Box>
      <Paper
        elevation={2}
        sx={{
          color:'white',
          background: '#349FDA',
          padding: 1
        }}
      >
        <Typography>
          { body }
        </Typography>
        <IconButton onClick={ handleDelete }><DeleteIcon fontSize='small'/></IconButton>
        <IconButton onClick={ handleLike }>
          { isLiked ? <ThumbUpAltIcon fontSize='small'/> : <ThumbUpOffAltIcon fontSize='small'/> }
        </IconButton>
      </Paper>
    </Box>
  );
}

export default Message;
