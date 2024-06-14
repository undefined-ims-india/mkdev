import React, { ReactElement } from 'react';
import Message from './Message';

import { Messages, Conversations } from '@prisma/client';

interface PropsType {
  allMsgs: Messages[],
  con: Conversations;
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
