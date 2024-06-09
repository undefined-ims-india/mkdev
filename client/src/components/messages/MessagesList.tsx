import React, { ReactElement } from 'react';
import Message from './Message';

interface PropsType {
  allMsgs: {
    body: string;
    senderId: number;
  }[],
}

const MessagesList: React.FC<PropsType> = (props): ReactElement => {

  const { allMsgs } = props;

  return (
    <div>
      {
        allMsgs.map((msg, i) => {
          return (
            <Message msg={ msg } key={ `${msg}-${i}` }/>
          )
        })
      }

    </div>
  );
}

export default MessagesList;
