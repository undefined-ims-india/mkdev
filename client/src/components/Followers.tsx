import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Followers = (): ReactElement => {
  const { id } = useParams();
  const [followerData, setFollowerData] = useState<UserProfile[] | null>(null);

  useEffect(() => {
    axios
      .get(`/api/follows/followers/${id}`)
      .then(({ data }): void => {
        setFollowerData(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      {followerData && followerData.length === 0 ? (
        `No Followers`
      ) : (
        <List>
          {followerData &&
            followerData.map((follower) => (
              <ListItem key={follower!.id}>
                <ListItemAvatar>
                  <a href={`/${follower!.id}/profile`}>
                    <Avatar
                      alt={follower!.username || ''}
                      src={follower!.picture || ''}
                    />
                  </a>
                </ListItemAvatar>
                <ListItemText primary={follower!.username} />
              </ListItem>
            ))}
        </List>
      )}
    </div>
  );
};

export default Followers;
