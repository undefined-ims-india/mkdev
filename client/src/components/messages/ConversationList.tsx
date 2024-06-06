import React, { ReactElement } from 'react';
import Conversation from './Conversation';

const ConversationList = (): ReactElement => {
  return (
    <>
      <h4>The ConversationList component will be here</h4>
      {/** map Conversation */}
      <Conversation />
    </>
  );
}

export default ConversationList;
