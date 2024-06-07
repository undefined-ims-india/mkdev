import React, { useState, ReactElement } from 'react';
import axios from 'axios';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Message {
    body: string;
    senderId: number;
}

const ConversationView = (): ReactElement => {

  const [allMsgs, setAllMsgs] = useState<Message[]>([]);

  const getAllMsgs = (): void => {
    // send request to backend GET messages route
    axios
      .get('/api/messages')
      .then(({ data }) => {
        console.log('array of messages in db', data);
        setAllMsgs(data);
      })
      .catch((err) => {
        console.error('Failed to retrieve messages from db:\n', err);
      })

    // results from GET /api/messages are in array


    // set allMsgs to result of query
  }
  // getAllMsgs();

  socket.on('message', (msg: Message): void => {
    // console.log('msg emitted from server:', msg);
    // allMsgs.push(msg);
    // console.log('allMsgs from socket server', allMsgs);
    setAllMsgs([...allMsgs, msg]);
  })

  return (
    <div>
      <h2>The ConversationView component will be here</h2>
      <MessagesList allMsgs={allMsgs}/>
      <MessageInput />
    </div>
  );
}

export default ConversationView;
