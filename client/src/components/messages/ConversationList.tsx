import React, { ReactElement } from 'react';
import Conversation from './Conversation';

import { Conversations } from '@prisma/client';

import Stack from '@mui/material/Stack';

interface PropTypes {
  allCons: Conversations[],
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations) => void;
  setCons: () => void;
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  const { allCons, setCons, select } = props;

  return (
    <div>
      <Stack>
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
      </Stack>
    </div>
  );
}

export default ConversationList;
