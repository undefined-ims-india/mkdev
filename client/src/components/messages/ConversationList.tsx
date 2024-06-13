import React, { ReactElement } from 'react';
import Conversation from './Conversation';

interface PropTypes {
  allCons: {
    id: number;
    participants: { name: string }[];
  }[],
  // select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number) => void;
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  // const { allCons, select } = props;
  const { allCons } = props;

  return (
    <div>
      {
        allCons.map((con, i) => {
          return (
            <Conversation
              con={ con }
              key={ `${con.id}-${i}` }
              // select={ select }
            />
          )
        })
      }

    </div>
  );
}

export default ConversationList;
