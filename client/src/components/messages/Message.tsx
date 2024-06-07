import React, { ReactElement } from 'react';

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
  }
}

const Message: React.FC<PropsType> = (props): ReactElement => {
  const { body, senderId } = props.msg;

  return (
    <div>
      <p>{ body }</p>
    </div>
  );
}

export default Message;
