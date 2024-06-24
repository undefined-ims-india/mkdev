import React, { ReactElement } from 'react';
import Message from './Message';

import { Messages, Conversations } from '@prisma/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

interface PropsType {
  allMsgs: Messages[],
  con: Conversations;
  getAllMsgs: () => void;
}

const MessagesList: React.FC<PropsType> = (props): ReactElement => {
  const { allMsgs, getAllMsgs, con } = props;

  return (
    <Box
      sx={{
        maxHeight: '55vh',
        width: '60vw',
        overflow: 'auto',
      }}
    >
      <List>
        {
          allMsgs.map((msg, i) => {
            if (msg.conversationId === con.id) {
              return (
                <ListItem key={`${i}`}>
                  <Message msg={ msg } getAllMsgs={ getAllMsgs } key={ `${msg}-${i}` }/>
                </ListItem>
              )
            }
          })
        }

      </List>
    </Box>
  );
}

export default MessagesList;
