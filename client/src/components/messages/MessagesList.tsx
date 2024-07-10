import React, { useEffect, useRef, ReactElement } from 'react';
import Message from './Message';

import { Conversations } from '@prisma/client';
import { MessageWithMetadata } from '../../../../types';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

interface PropsType {
  allMsgs: MessageWithMetadata[],
  con: Conversations;
  getAllMsgs: () => void;
}

const MessagesList: React.FC<PropsType> = ({ allMsgs, getAllMsgs, con }): ReactElement => {

  const latestMsgRef = useRef<HTMLLIElement>(null);

  // scroll to most recent message automatically
  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollIntoView();
    }
  }, [allMsgs])

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: '50vh',
        overflow: 'auto',
      }}
    >
      <List>
        {
          allMsgs.map((msg, i) => {
            if (msg.conversationId === con.id) {
              return i !== allMsgs.length - 1 ? (
                <ListItem key={`${i}`}>
                  <Message msg={ msg } getAllMsgs={ getAllMsgs } key={ `${msg}-${i}` }/>
                </ListItem>
              ) : (
                <ListItem key={`${i}`} ref={ latestMsgRef }>
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
