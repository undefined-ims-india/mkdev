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
    participants: { name: string }[];
  };
  conUsers: { name: string }[] | undefined;
  addingConversation: boolean;
  addConversation: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ConversationView: React.FC<PropsType> = (props): ReactElement => {
  const { con, conUsers, addingConversation, addConversation } = props;
  // console.log('addingConversation', addingConversation);
  // console.log('conUsers in conView', conUsers);

  const [allMsgs, setAllMsgs] = useState<Message[]>([]);
  const [conversationCreated, setConversationCreated] = useState<boolean>(false);

  // const usersString = conUsers?.reduce((acc, curr) => {
  //   curr.partic
  // }, '')

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

  socket.on('message', (msg: Message): void => {
    // add emitted messages to allMsgs
    setAllMsgs([...allMsgs, msg]);
  })

  // const handleRecipientsInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setRecipientText(e.target.value);
  // }

  return (
    <div>
      {/* { usersString } */}
      <h3>Names of participants should be here</h3>
      <MessagesList allMsgs={ allMsgs } con={ con }/>
      <MessageInput con={ con }/>
    </div>
  );
}

export default ConversationView;
