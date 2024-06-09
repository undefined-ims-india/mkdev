import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Message {
    body: string;
    senderId: number;
} 

interface PropsType {
  conId: number;
}

// TODO: pass a conversation into ConversationView, ConversationView will only render messages from that conversation
// pass conversation down from Messages
const ConversationView: React.FC<PropsType> = (props): ReactElement => {
  const { conId } = props;

  const [allMsgs, setAllMsgs] = useState<Message[]>([]);

  // TODO: change to only get messages from certain conversation passed down from Messages
  // pass this down? or have same effect on MessagesList?
  // conversation id to be used in endpoint can come from props
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

  return (
    <div>
      <h2>Conversation { conId }</h2>
      <MessagesList allMsgs={ allMsgs }/>
      <MessageInput conId={ conId }/>
    </div>
  );
}

export default ConversationView;
