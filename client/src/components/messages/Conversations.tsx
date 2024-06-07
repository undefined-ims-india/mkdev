import React, { ReactElement } from 'react';
import ConversationList from './ConversationList';

const Conversations = (): ReactElement => {
  return (
    <>
      <h3>The Conversations component will be here</h3>
      {/** ConversationList */}
      <ConversationList />
    </>
  );
}

export default Conversations;
