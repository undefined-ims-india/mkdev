import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../../types';
import Link from '@mui/material/Link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Following = (): React.ReactElement => {
  const { id } = useParams();
  const [followingData, setFollowingData]: [UserProfile[] | null, Function] =
    useState<UserProfile[] | null>(null);

  useEffect(() => {
    axios
      .get(`/api/follows/following/${id}`)
      .then(({ data }) => {
        setFollowingData(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <>
      {followingData && followingData.length === 0 ? (
        <Typography variant='h1' component='h2' fontSize={'1rem'}>
          Not Following Any Developers
        </Typography>
      ) : (
        <>
          <List>
            {followingData &&
              followingData.map((following) => (
                <ListItem key={following.id}>
                  <ListItemAvatar>
                    <Link href={`/user/${following.id}/profile`}>
                      <Avatar
                        alt={following.username || ''}
                        src={following.picture || '?'}
                      />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText primary={following.username} />
                </ListItem>
              ))}
          </List>
        </>
      )}
    </>
  );
};

export default Following;
