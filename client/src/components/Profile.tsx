import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
interface User {
  name: string;
  picture: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState([]);
  const userRef = useRef(user);

  useEffect(() => {
    axios
      .get('/profile')
      .then(({ data }) => {
        setUser(data);
        // console.log('user', data);
      })
      .catch((error) => {
        console.error('Failed to get user:', error);
      });
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/posts/${user.name}`)
        .then(({ data }) => {
          setPosts(data);
          console.log("user's posts", data);
        })
        .catch((error) => {
          console.error("Failed to get use's posts:", error);
        });
    }
  }, [userRef]);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img src={user.picture} alt={user.name} />
        </div>
      )}
    </div>
  );
};

export default Profile;
