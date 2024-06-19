import React, { ReactElement } from 'react';
import Message from './Message';

import { Messages, Conversations } from '@prisma/client';

interface PropsType {
  allMsgs: Messages[],
  con: Conversations;
  getAllMsgs: () => void;
}

const MessagesList: React.FC<PropsType> = (props): ReactElement => {
  const { allMsgs, getAllMsgs, con } = props;

  return (
    <div>
      {
        allMsgs.map((msg, i) => {
          if (msg.conversationId === con.id) {
            return (
              <Message msg={ msg } getAllMsgs={ getAllMsgs } key={ `${msg}-${i}` }/>
            )
          }
        })
      }

    </div>
  );
}

export default MessagesList;
