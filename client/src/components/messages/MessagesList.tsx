import React, { ReactElement } from 'react';
import Message from './Message';

const MessagesList = (): ReactElement => {
  return (
    <>
      <h4>The MessagesList component will be here</h4>
      {/** map Message */}
      <Message />
    </>
  );
}

export default MessagesList;
