import React, { ReactElement } from 'react';
import Conversation from './Conversation';

interface PropTypes {
  allCons: {
    id: number;
  }[],
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number) => void;
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  const { allCons, select } = props;

  return (
    <div>
      {
        allCons.map((con, i) => {
          return (
            <Conversation
              id={ con.id }
              key={ `${con.id}-${i}` }
              select={ select }
            />
          )
        })
      }

    </div>
  );
}

export default ConversationList;
