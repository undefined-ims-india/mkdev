import React, { ReactElement } from 'react';
import Message from './Message';

interface PropsType {
  allMsgs: string[],
}

const MessagesList: React.FC<PropsType> = (props): ReactElement => {
  console.log('props.allMsgs', props.allMsgs)
  const { allMsgs } = props;

  return (
    <div>
      <h4>List of messages below</h4>
      {
        allMsgs.map((msg, i) => {
          return (
            <Message msg={msg} key={`${msg}-${i}`}/>
          )
        })
      }

    </div>
  );
}

export default MessagesList;
