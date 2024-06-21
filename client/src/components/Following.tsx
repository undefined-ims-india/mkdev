import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Following = (): React.ReactElement => {
  const { id } = useParams();
  const [followingData, setFollowingData]: [UserProfile[] | null, Function] =
    useState<UserProfile[] | null>(null);

  useEffect(() => {
    axios.get(`/api/follows/following/${id}`).then(({ data }) => {
      setFollowingData(data);
    });
  }, [id]);

  return (
    <div>
      {followingData && followingData.length === 0 ? (
        `Not following any Developers`
      ) : (
        <List>
          {followingData &&
            followingData.map((following) => (
              <ListItem key={following.id}>
                <ListItemAvatar>
                  <a href={`/user/${following.id}/profile`}>
                    <Avatar
                      alt={following.username || ''}
                      src={following.picture || '?'}
                    />
                  </a>
                </ListItemAvatar>
                <ListItemText primary={following.username} />
              </ListItem>
            ))}
        </List>
      )}
    </div>
  );
};

export default Following;
