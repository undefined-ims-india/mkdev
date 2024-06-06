import React, { ReactElement } from 'react';
import Conversations from './Conversations';
import ConversationView from './ConversationView';

// this is where I want the socketio client to go instead of on index.html
import io from 'socket.io-client';
const socket = io('http://localhost:4000');

const Messages = (): ReactElement => {
  return (
    <>
      <h1>The messages will be here</h1>
      <Conversations />
      <ConversationView />
    </>
  );
}

export default Messages;
