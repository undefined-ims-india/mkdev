import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinId: string;
  githubId: string;
  sub: string;
  username: string;
  picture: string;
}

export const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: {} as User,
  setUser: (user: User) => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    axios
      .get('/api/users/loggedIn')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Failed to get user:', error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
