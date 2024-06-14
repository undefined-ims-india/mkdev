import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Message {
    body: string;
    senderId: number;
    conversationId: number;
}

interface PropsType {
  con: {
    id: number;
    participants: { username: string }[];
  };
  label: string;
  addingConversation: boolean;
}

const ConversationView: React.FC<PropsType> = (props): ReactElement => {
  const { con, label, addingConversation } = props;

  const [allMsgs, setAllMsgs] = useState<Message[]>([]);

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
  socket.on('message', (msg: Message): void => {
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
