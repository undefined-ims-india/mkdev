import React, { ReactElement } from 'react';
import Conversation from './Conversation';

const ConversationList = (): ReactElement => {
  return (
    <div>
      <h2>The ConversationList component will be here</h2>
      {/** map Conversation */}
      <Conversation />
    </div>
  );
}

export default ConversationList;
