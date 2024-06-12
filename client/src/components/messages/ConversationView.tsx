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
  conId: number;
  addingConversation: boolean;
  addConversation: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ConversationView: React.FC<PropsType> = (props): ReactElement => {
  const { conId, addingConversation, addConversation } = props;
  // console.log('addingConversation', addingConversation);

  const [allMsgs, setAllMsgs] = useState<Message[]>([]);
  const [recipientText, setRecipientText] = useState<string>('');
  const [conversationCreated, setConversationCreated] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/api/messages/${conId}`)
      .then(({ data }) => {
        setAllMsgs(data);
      })
      .catch((err) => {
        console.error('Failed to retrieve messages from db:\n', err);
      })
  }, [conId])

  socket.on('message', (msg: Message): void => {
    // add emitted messages to allMsgs
    setAllMsgs([...allMsgs, msg]);
  })

  const handleRecipientsInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRecipientText(e.target.value);
  }

  return (
    <div>
      <h3>Names of participants should be here</h3>
      <MessagesList allMsgs={ allMsgs } conId={ conId }/>
      <MessageInput conId={ conId }/>
    </div>
  );
}

export default ConversationView;
