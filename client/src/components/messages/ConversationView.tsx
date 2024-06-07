import React, { useState, ReactElement } from 'react';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const ConversationView = (): ReactElement => {

  const [allMsgs, setAllMsgs] = useState<string[]>([]);

  socket.on('message', (msg: string): void => {
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
