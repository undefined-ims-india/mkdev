import React, { useState, useEffect, ReactElement } from 'react';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';

import axios from 'axios';
import io from 'socket.io-client';
import { Messages, Conversations } from '@prisma/client';

const socket = io('http://ec2-3-19-237-1.us-east-2.compute.amazonaws.com:4000/');

interface PropsType {
  con: Conversations;
  label: string;
  addingConversation: boolean;
}

const ConversationView: React.FC<PropsType> = (props): ReactElement => {
  const { con, label, addingConversation } = props;

  const [allMsgs, setAllMsgs] = useState<Messages[]>([]);

  // get messages in conversation
  useEffect(() => {
    axios
      .get(`/api/messages/${con.id}`)
      .then(({ data }) => {
        setAllMsgs(data);
      })
      .catch((err) => {
        console.error('Failed to retrieve messages from db:\n', err);
      })
  }, [con])

  // add any received message from websocket
  socket.on('message', (msg: Messages): void => {
    // add emitted messages to allMsgs
    setAllMsgs([...allMsgs, msg]);
  })

  return (
    <div>
      { !addingConversation ? (
          <>
            <h3>{ label }</h3>
            <MessagesList allMsgs={ allMsgs } con={ con }/>
            <MessageInput con={ con }/>
          </>
        ) : ('')
      }
    </div>
  );
}

export default ConversationView;
