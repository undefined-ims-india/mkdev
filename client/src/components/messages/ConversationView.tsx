import React, { ReactElement } from 'react';
import MessagesView from './MessagesView';
import MessageInput from './MessageInput';

const ConversationView = (): ReactElement => {
  return (
    <>
      <h2>The ConversationView component will be here</h2>
      <MessagesView />
      <MessageInput />
    </>
  );
}

export default ConversationView;
