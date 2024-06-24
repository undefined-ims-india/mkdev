import React, { useState, useEffect, ReactElement } from 'react';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';

import axios from 'axios';
import io from 'socket.io-client';
import { Messages, Conversations } from '@prisma/client';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const socket = io('http://localhost:4000');

interface PropsType {
  con: Conversations;
  label: string;
  addingConversation: boolean;
}

const ConversationView: React.FC<PropsType> = (props): ReactElement => {
  const { con, label, addingConversation } = props;

  const [allMsgs, setAllMsgs] = useState<Messages[]>([]);

  // get messages in conversation
  const getAllMsgs = (): void => {
    axios
    .get(`/api/messages/${con.id}`)
    .then(({ data }) => {
      setAllMsgs(data);
    })
    .catch((err) => {
      console.error('Failed to retrieve messages from db:\n', err);
    })
  }
  useEffect(() => {
    getAllMsgs();
  }, [con])

  // add any received message from websocket
  socket.on('message', (msg: Messages): void => {
    // add emitted messages to allMsgs
    setAllMsgs([...allMsgs, msg]);
  })

  return (
    <Grid container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      { !addingConversation ? (
        <>
          <Box
            sx={{
              top: 0
            }}
          >
            <Typography variant='h4'>
              { label }
            </Typography>
          </Box>
          <Box>
            <Grid item>
              <MessagesList allMsgs={ allMsgs } getAllMsgs={ getAllMsgs } con={ con }/>
            </Grid>
            <Grid item>
              <MessageInput con={ con }/>
            </Grid>
          </Box>
        </>
        ) : ('')
      }
    </Grid>
  );
}

export default ConversationView;
