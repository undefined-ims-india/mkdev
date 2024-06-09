import React, { ReactElement } from 'react';
import Message from './Message';

interface PropsType {
  allMsgs: {
    body: string;
    senderId: number;
    conversationId: number;
  }[],
  conId: number;
}

const MessagesList: React.FC<PropsType> = (props): ReactElement => {

  const { allMsgs, conId } = props;

  return (
    <div>
      {
        allMsgs.map((msg, i) => {
          if (msg.conversationId === conId) {
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
