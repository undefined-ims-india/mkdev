import React, { ReactElement } from 'react';
import Conversation from './Conversation';

import { Conversations } from '@prisma/client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

interface PropTypes {
  allCons: Conversations[],
  select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations | null) => void;
  setCons: () => void;
  deleteCon: () => void;
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  const { allCons, select, setCons, deleteCon } = props;

  return (
    <Grid container
    sx={{
      // border: 1,
      paddingLeft: 4
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
