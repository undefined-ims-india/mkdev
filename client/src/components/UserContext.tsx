import React, {createContext, useEffect, useState, ReactNode, ReactElement} from "react";
import axios from "axios";

export const UserContext = createContext({userId: 0, userImage: ''});

export const UserProvider = ({children}: {children: ReactNode}):ReactElement => {

  const [userId, setUserId] = useState(0);
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    axios.get('/api/users/loggedIn')
      .then(({data}):void => {
        setUserId(data.id || 0);
        setUserImage(data.image || '');
      })
  });

  return (
    <UserContext.Provider value={{userId, userImage}}>
      {children}
    </UserContext.Provider>
  );
};