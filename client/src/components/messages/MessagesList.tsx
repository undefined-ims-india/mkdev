import React, { useEffect, useRef, ReactElement, useContext } from 'react';
import { UserContext } from '../UserContext';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';

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

  const { userId } = useContext(UserContext)
  const latestMsgRef = useRef<HTMLLIElement>(null);

  // scroll to most recent message automatically
  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allMsgs])

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: '50vh',
        overflowY: 'scroll'
      }}
    >
      <List>
        {
          allMsgs.map((msg, i) => {
            if (msg.conversationId === con.id) {
              if (userId === msg.senderId) {
                return i !== allMsgs.length - 1 ? (
                  <ListItem
                    key={`${i}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse'
                    }}
                  >
                    <OutgoingMessage msg={ msg } getAllMsgs={ getAllMsgs } key={ `${msg}-${i}` }/>
                  </ListItem>
                ) : (
                  <ListItem
                    key={`${i}`}
                    ref={ latestMsgRef }
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse'
                    }}
                  >
                    <OutgoingMessage msg={ msg } getAllMsgs={ getAllMsgs } key={ `${msg}-${i}` }/>
                  </ListItem>
                )
              } else {
                return i !== allMsgs.length - 1 ? (
                  <ListItem key={`${i}`}>
                    <IncomingMessage msg={ msg } getAllMsgs={ getAllMsgs } key={ `${msg}-${i}` }/>
                  </ListItem>
                ) : (
                  <ListItem key={`${i}`} ref={ latestMsgRef }>
                    <IncomingMessage msg={ msg } getAllMsgs={ getAllMsgs } key={ `${msg}-${i}` }/>
                  </ListItem>
                )
              }
            }
          })
        }
      </List>
    </Box>
  );
}

export default MessagesList;
