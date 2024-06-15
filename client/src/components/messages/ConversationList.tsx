import React, { ReactElement } from 'react';
import Conversation from './Conversation';

import { Conversations } from '@prisma/client';

interface PropTypes {
  allCons: Conversations[],
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations) => void;
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
