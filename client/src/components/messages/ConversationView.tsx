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
  addConversation: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ConversationView: React.FC<PropsType> = (props): ReactElement => {
  const { con, label, addingConversation, addConversation } = props;
  // console.log('addingConversation', addingConversation);

  const [allMsgs, setAllMsgs] = useState<Message[]>([]);
  const [conversationCreated, setConversationCreated] = useState<boolean>(false); // TODO: might be extraneous with addingConversation

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
      {/* <h3>{ usersString.slice(0, usersString.length - 2) }</h3> */}
      <h3>{ label.slice(0, label.length - 2) }</h3>
      <MessagesList allMsgs={ allMsgs } con={ con }/>
      <MessageInput con={ con }/>
    </div>
  );
}

export default ConversationView;
