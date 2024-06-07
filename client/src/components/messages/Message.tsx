import React, { ReactElement } from 'react';

interface PropsType {
  msg: string
}

const Message: React.FC<PropsType> = (props): ReactElement => {
  const { msg } = props;

  return (
    <div>
      <p>{ msg }</p>
    </div>
  );
}

export default Message;
