import React, { ReactElement } from 'react';
import Message from './Message';

interface PropsType {
  allMsgs: {
    body: string;
    senderId: number;
  }[],
}

const MessagesList: React.FC<PropsType> = (props): ReactElement => {
  // console.log('props.allMsgs', props.allMsgs)
  const { allMsgs } = props;

  return (
    <div>
      {
        allMsgs.map((msg, i) => {
          // console.log('msg in map', msg);
          return (
            <Message msg={ msg } key={ `${msg}-${i}` }/>
          )
        })
      }

    </div>
  );
}

export default MessagesList;
