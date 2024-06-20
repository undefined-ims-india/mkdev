import React, { ReactElement } from 'react';
import Conversation from './Conversation';

import { Conversations } from '@prisma/client';

import Stack from '@mui/material/Stack';

interface PropTypes {
  allCons: Conversations[],
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations | null) => void;
  setCons: () => void;
  deleteCon: () => void;
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  const { allCons, select, setCons, deleteCon } = props;

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
              deleteCon={ deleteCon }
            />
          )
        })
      }
      </Stack>
    </div>
  );
}

export default ConversationList;
