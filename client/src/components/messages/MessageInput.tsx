import React, { useState, useContext, ReactElement } from 'react';
import { UserContext } from '../UserContext';

import io from 'socket.io-client';
import axios from 'axios';
import { Conversations } from '@prisma/client';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

const socket = io('http://localhost:4000');

interface PropsType {
  con: Conversations;
}

const MessageInput: React.FC<PropsType> = ({ con }): ReactElement => {

  const [text, setText] = useState('');
  const sender = useContext(UserContext).id;

  const handleText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  }

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    // only send message if there is text in input field
    if (text) {
      // send message to database with current conversation
      axios
        .post(`/api/messages/${con.id}`, {
          message: {
            body: text,
            sender
          }
        })
        .then(({ data }) => {
          // broadcast the message to all the clients
          socket.emit('message', {
            ...data,
            newMessage: 1,
          })
        })
        .catch((err) => {
          console.error('Failed to post message to db', err.cause);
        });

      setText('');
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // only send message if there is text in input field
      if (text) {
        // send message to database with current conversation
        axios
          .post(`/api/messages/${con.id}`, {
            message: {
              body: text,
              sender
            }
          })
          .then(({ data }) => {
            // broadcast the message to all the clients
            socket.emit('message', {
              ...data,
              newMessage: 1,
            })
          })
          .catch((err) => {
            console.error('Failed to post message to db', err.cause);
          });

        setText('');
      }
    }
  }

  return (
      <Box
        component='form'
        autoComplete='off'
        sx={{
          width: .6,
          position: 'absolute',
          bottom: 12,
        }}
      >
        <TextField
          fullWidth
          placeholder='message
          'value={ text }
          onChange={ handleText }
          onKeyDown={ handleEnter }
        />
          <IconButton onClick={ sendMessage } >
            <SendIcon />
          </IconButton>
        </Box>
  );
}

export default MessageInput;
