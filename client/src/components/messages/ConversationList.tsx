import React, { ReactElement } from 'react';
import Conversation from './Conversation';

import { Conversations } from '@prisma/client';

interface PropTypes {
  allCons: Conversations[],
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations) => void;
  setCons: () => void;
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  const { allCons, setCons, select } = props;

  return (
    <div>
      { /* TODO: use Stack to stack buttons */}
      {
        allCons.map((con, i) => {
          return (
            <Conversation
              con={ con }
              key={ `${con.id}-${i}` }
              setCons={ setCons }
              select={ select }
            />
          )
        })
      }

    </div>
  );
}

export default ConversationList;
