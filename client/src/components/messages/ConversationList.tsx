import React, { ReactElement } from 'react';
import Conversation from './Conversation';

interface PropTypes {
  allCons: {
    id: number;
    label: string;
    participants: { username: string }[];
  }[],
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversation) => void;
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  const { allCons, select } = props;

  return (
    <div>
      {
        allCons.map((con, i) => {
          return (
            <Conversation
              con={ con }
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
