import React, { ReactElement } from 'react';
import Conversation from './Conversation';

import { ConversationWithParticipants } from '../../../../types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';

interface PropTypes {
  allCons: ConversationWithParticipants[];
  visibleCon: React.MutableRefObject<number>;
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: ConversationWithParticipants | null) => void;
  setCons: () => void;
  deleteCon: () => void;
}

const ConversationList: React.FC<PropTypes> =
  ({
    allCons,
    visibleCon,
    select,
    setCons,
    deleteCon
  }): ReactElement => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List>
      {
        allCons.map((con, i) => {
          return (
            <ListItem dense={true} key={`${i}`}>
              <Conversation
                con={ con }
                key={ `${con.id}-${i}` }
                visibleCon={ visibleCon }
                setCons={ setCons }
                select={ select }
                deleteCon={ deleteCon }
              />
            </ListItem>
          )
        })
      }
      </List>
    </Box>
  );
}

export default ConversationList;
