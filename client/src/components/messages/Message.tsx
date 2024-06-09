import React, { ReactElement } from 'react';

// db schema for message, request should follow
// {
//   "id": 5,
//   "body": "Well, that's just like... your opinion, man.",
//   "senderId": 1,
//   "conversationId": 1
// },

interface PropsType {
  msg: {
    body: string;
    senderId: number;
    conversationId: number;
  }
}

const Message: React.FC<PropsType> = (props): ReactElement => {
  const { body, senderId } = props.msg; // TODO: senderId will be used for styling and/or including picture

  return (
    <div>
      <p>{ body }</p>
    </div>
  );
}

export default Message;
