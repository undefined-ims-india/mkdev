import React, { ReactElement } from 'react';
import Message from './Message';

interface PropsType {
  allMsgs: {
    body: string;
    senderId: number;
    conversationId: number;
  }[],
  con: {
    id: number;
    participants: { username: string }[];
  };
}

const MessagesList: React.FC<PropsType> = (props): ReactElement => {

  const { allMsgs, con } = props;

  return (
    <div>
      {
        allMsgs.map((msg, i) => {
          if (msg.conversationId === con.id) {
            return (
              <Message msg={ msg } key={ `${msg}-${i}` }/>
            )
          }
        })
      }

    </div>
  );
}

export default MessagesList;
