import React, { ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const Profile = (): ReactElement => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <h1> Profile </h1>
      <>
        <Nav />
      </>
    </div>
  );
};

export default Profile;
