import React, { ReactElement } from 'react';
import Conversation from './Conversation';

interface PropTypes {
  allCons: {
    id: number;
  }[],
}

const ConversationList: React.FC<PropTypes> = (props): ReactElement => {
  const { allCons } = props;

  return (
    <div>
      {
        allCons.map((con, i) => {
          return (
            <Conversation id={ con.id } key={ `${con.id}-${i}` }/>
          )
        })
      }

    </div>
  );
}

export default ConversationList;
