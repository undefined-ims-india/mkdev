import React, {createContext, useEffect, useState, ReactNode, ReactElement} from "react";
import axios from "axios";

export const UserContext = createContext(0);

export const UserProvider = ({children}: {children: ReactNode}):ReactElement => {

  const [userId, setUserId] = useState(0);
  useEffect(() => {
    axios.get('/api/users/loggedIn')
      .then(({data}):void => {
        setUserId(data.id || 0);
      })
  });

  console.log(userId)

  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
};