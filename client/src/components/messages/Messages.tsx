import React, { ReactElement } from 'react';
import Conversations from './Conversations';
import ConversationView from './ConversationView';

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
