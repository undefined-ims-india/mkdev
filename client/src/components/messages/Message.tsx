import React, { useState, useEffect, ReactElement } from 'react';
import { Messages } from '@prisma/client';

import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Typography from '@mui/material/Typography';
import axios from 'axios';

interface PropsType {
  msg: Messages;
  getAllMsgs: () => void;
}

const Message: React.FC<PropsType> = (props): ReactElement => {
  const { getAllMsgs } = props;
  const { id, body, liked, senderId } = props.msg; // TODO: senderId will be used for styling and/or including picture

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
    <div>
      <Card sx={{ maxWidth: 275, bgcolor: 'beige' }}>
        <CardContent>
          <Typography>
            { body }
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={ handleDelete }><DeleteIcon fontSize='small'/></IconButton>
          <IconButton onClick={ handleLike }>
            { isLiked ? <ThumbUpAltIcon fontSize='small'/> : <ThumbUpOffAltIcon fontSize='small'/> }
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Message;
