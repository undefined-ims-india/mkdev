import React, { ReactElement } from 'react';

interface PropsType {
    id: number;
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  const { id } = props;

  return (
    <div>
      <button>Conversation {id}</button>
    </div>
  );
}

export default Conversation;
