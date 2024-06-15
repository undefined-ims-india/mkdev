import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfileType } from '../../../types';
import Nav from './Nav';
import Post from './Post';

import Box from '@mui/material/Box'

const UserProfile = ():React.ReactElement => {

  let { id } = useParams();
  let [profileData, setProfileData]: [UserProfileType | null, Function] = useState(null);
  let profileDataREF = useRef(profileData)

  useEffect(() => {
    axios.get(`/api/users/${id}/profile`)
      .then(({data}) => {
        setProfileData(data);
      })
  }, [profileDataREF])

  try {
    return (
      <>
        <Nav />
          <Box>
            <h1>{profileData!.username}</h1>
          </Box>
          {profileData!.posts.map((post) => <Post key={post.title + crypto.randomUUID()} content={post} />)}
      </>
    )
  }
  catch {
    return <>{'Please Wait'}</>
  }
}

export default UserProfile;