import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import io from 'socket.io-client';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const socket = io('http://localhost:4000');

type Conversation = {
  id: number;
  participants: { name: string }[];
}

type User = {
  id: number;
  name: string;
  username: string;
  googleId: string;
  linkedinId: string;
  githubId: string;
  picture: string;
  firstName: string;
  lastName: string;
  follower_count: number;
  post_count: number;
}

const Messages = (): ReactElement => {

  const [con, setCon] = useState<Conversation>();
  const [conUsers, setConUsers] = useState<{ name: string }[]>();
  const [addingConversation, setAddingConversation] = useState<boolean>(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [participantsEntry, setParticipantsEntry] = useState<string[]>([]);
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loginError, setLoginError] = useState<boolean>(false);

  // get all current conversations
  // TODO: *** per user: the only conversations listed should be the ones the user is a part of
  const getAllConversations = (): void => {
    axios
      .get('/api/conversations')
      .then((conversations) => {
        // console.log('conversations from getAllConvos', conversations.data)
        setAllConversations(conversations.data);
      })
      .catch((err) => {
        setLoginError(true);
        console.error('Failed to retrieve conversations:\n', err);
      })
  }

  const getAllUsers = (): void => {
    axios
      .get('/api/users')
      .then((users) => {
        // console.log('users to message', users.data);
        setAllUsers(users.data);
      })
      .catch((err) => {
        console.error('Failed to get list of users:\n', err);
      })
  }

  // get list of conversations upon page load
  useEffect(() => {
    getAllConversations();
  }, [])

  // get list of available users upon load
  useEffect(() => {
    getAllUsers();
  }, [])

  const beginConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    setAddingConversation(true);
  }

  const addConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    // create conversation, set new conversation id
    axios
      .post('/api/conversations', {
        participants: participants // users that sender enters
      })
      .then((conversation) => {
        // console.log('conversation', conversation)
        // console.log('conversation.data', conversation.data)
        const { participants } = conversation.data;
        setCon(conversation.data);
        setConUsers(participants);
        socket.emit('add-conversation', {
          id: conversation.data.id
        });
      })
      .then(() => {

        getAllConversations();
      })
      .catch((err) => {
        console.error('Failed to create a conversation:\n', err);
      });
  }

  const changeParticipants = (e: React.ChangeEvent<{}>, newValues: string[]): void => {
    // console.log('parts newValue: ', newValues);
    setParticipantsEntry(newValues);
    // iterate through participants entry and find user objects from all users
    const participantsArr: User[] = [];

    // store in array to then pass in request body
    newValues.forEach((username) => {
      for (let i = 0; i < allUsers.length; i++) {
        if ( allUsers[i].username === username) {
          participantsArr.push(allUsers[i]);
        }
      }
    })
    setParticipants(participantsArr);
    // console.log('participantsArr', participantsArr)
  }

  // const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number): void => {
  //   setCon(newId);
  // }

  socket.on('add-conversation', (conversation: Conversation): void => {
    // add emitted conversation to allConversations
    setAllConversations([...allConversations, conversation]);
    getAllConversations();
  })

  return (
    <div>
      <h1>Direct Messages</h1>
      { loginError ? (
        <>
          <h3> You must be logged in to view conversations</h3>
        </>
      ) : (
        <>
          <button onClick={ beginConversation }>➕ Start Conversation</button>
          <ConversationList allCons={ allConversations } />
          {/* <ConversationList allCons={ allConversations } select={ selectConversation }/> */}
          { addingConversation ? (
              <form>
                <Autocomplete
                  // value={ participantsEntry }
                  multiple
                  id="tags-filled"
                  options={allUsers.map((option) => option.username)}
                  value={ participantsEntry }
                  onChange={ changeParticipants }
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index: number) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip variant="outlined" label={option} key={key} {...tagProps} />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="To:"
                      placeholder="usernames"
                    />
                  )}
                />
                <button onClick={ addConversation }>Add Conversation</button>
              </form>
            ) : ('')
          }
          { con ?
            <ConversationView
              addingConversation={ addingConversation }
              addConversation={ beginConversation }
              con={ con }
              conUsers={ conUsers }
            /> : ''
          }
        </>
      )
      }
    </div>
  );
}

export default Messages;
