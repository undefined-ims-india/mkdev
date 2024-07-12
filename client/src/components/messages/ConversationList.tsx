import React, { ReactElement } from 'react';
import Conversation from './Conversation';

import { Conversations } from '@prisma/client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import { ConversationWithParticipants } from '../../../../types';

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
    <Grid container
    sx={{
      paddingTop: 4
    }}
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={3}
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
    </Grid>
  );
}

export default ConversationList;
