import React, {createContext, useEffect, useState, ReactNode, ReactElement} from "react";
import axios from "axios";

export const UserContext = createContext({id: 0, picture: '', username: '', name: ''});

export const UserProvider = ({children}: {children: ReactNode}):ReactElement => {

  const [id, setUserId] = useState(0);
  const [picture, setUserImage] = useState('');
  const [name, setUserName] = useState('');
  const [username, setUserUsername] = useState('');

  useEffect(() => {
    axios.get('/api/users/loggedIn')
      .then(({data}):void => {
        setUserId(data.id || 0);
        setUserImage(data.image || '');
        setUserName(data.name);
        setUserUsername(data.username);
      })
  });

  return (
    <UserContext.Provider value={{id, picture, username, name}}>
      {children}
    </UserContext.Provider>
  );
};