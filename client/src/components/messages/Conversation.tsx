import React, { ReactElement } from 'react';

interface PropsType {
    id: number;
    select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  const { id, select } = props;

  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    // value can be id from props
    
    // get value from button
    // set conversationId and pass it: up to Messages, over to conversationView, and down to MessageInput

  }

  return (
    <div>
      <button onClick={ select }>Conversation {id}</button>
    </div>
  );
}

export default Conversation;
