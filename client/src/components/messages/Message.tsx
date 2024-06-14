import React, { ReactElement } from 'react';
import { Messages } from '@prisma/client';

interface PropsType {
  msg: Messages;
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
