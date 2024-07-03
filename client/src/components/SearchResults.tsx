import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchComponent from './Search';
import Post from './Post';
import { PostWithRelations, UserProfile } from '../../../types';
import ProfileInfo from './profile/ProfileInfo';
import Grid from '@mui/material/Grid';

export default function SearchResults() {
  const { tagType, tags } = useParams();
  const [postFeed, setPostFeed]: [PostWithRelations[], Function] = useState([]);
  const [userFeed, setUserFeed] = useState([]);
  const feedRef = useRef(postFeed);

  const getSearch = () => {
    axios.get(`/api/search/filter/${tagType}/${tags}`).then(({ data }) => {
      if (tagType === 'User') {
        let users = data.reduce((acc: any, curr: any) => {
          acc.push(curr.user);
          return acc;
        }, []);
        console.log(users.flat());
        return setUserFeed(users.flat());
      }
      // else if tagType is equal to posts
      data.reduce((acc: any, curr: any) => {
        acc.push(curr.posts);
        return acc;
      }, []);
      return setPostFeed(data[0].posts);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  try {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <SearchComponent />
          {postFeed &&
            postFeed.map((post) => {
              return (
                <Post
                  key={post.id + post.title}
                  content={post}
                  refreshParent={getSearch}
                />
              );
            })}
          {userFeed && (
            <Grid container spacing={2}>
              {userFeed.map((user: UserProfile) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={`${user.name + user.id}`}>
                    <ProfileInfo profileData={user} handleEdit={() => {}} />
                  </Grid>
                );
              })}
            </Grid>
          )}
          {/* {userFeed && userFeed.map((user) => {
						console.log(user, 'This is user');
						return (
							<ProfileInfo profileData={user} handleEdit={() => {}}/>
						);
					})} */}
        </Box>
      </Box>
    );
  } catch (err) {
    console.error;
    return <></>;
  }
}
