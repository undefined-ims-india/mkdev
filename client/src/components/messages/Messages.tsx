import React, { ReactElement } from 'react';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';

const Messages = (): ReactElement => {
  return (
    <div>
      <h1>Direct Messages</h1>
      <ConversationList />
      <ConversationView />
    </div>
  );
}

export default Messages;
