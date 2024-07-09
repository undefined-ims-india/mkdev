import React, { useState, useEffect, ReactElement } from 'react';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';

import io from 'socket.io-client';
import axios from 'axios';
import { User, Conversations } from '@prisma/client';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const socket = io('http://localhost:4000');

const Messages = (): ReactElement => {

  const [con, setCon] = useState<Conversations | null>();
  const [addingConversation, setAddingConversation] = useState<boolean>(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [participantsLabel, setParticipantsLabel] = useState<string>('')
  const [participantsEntry, setParticipantsEntry] = useState<(string)[]>([]);
  const [allConversations, setAllConversations] = useState<Conversations[]>([]);
  const [visibleConversation, setVisibleConversation] = useState<Conversations | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loginError, setLoginError] = useState<boolean>(false);

  // get all current conversations for current user
  const getAllConversations = (): void => {
    axios
      .get('/api/conversations')
      .then((conversations) => {
        setAllConversations(conversations.data);
      })
      .catch((err) => {
        setLoginError(true);
        console.error('Failed to retrieve conversations:\n', err);
      })
  }

  // get list of conversations upon page load
  useEffect(() => {
    getAllConversations();
  }, [])

  // get list of users for autocomplete
  const getAllUsers = (): void => {
    axios
      .get('/api/users')
      .then((users) => {
        setAllUsers(users.data);
      })
      .catch((err) => {
        console.error('Failed to get list of users:\n', err);
      })
  }

  // get list of available users upon load
  useEffect(() => {
    getAllUsers();
  }, [])

  const beginConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    setAddingConversation(true);
  }

  const changeParticipants = (e: any, value: (string)[] ): void => {
    setParticipantsEntry(value);
    // iterate through participants entry and find user objects from all users
    const participantsArr: User[] = [];

    // store in array to then pass in request body
    value.forEach((username) => {
      for (let i = 0; i < allUsers.length; i++) {
        if ( allUsers[i].username === username) {
          participantsArr.push(allUsers[i]);
        }
      }
    })
    setParticipants(participantsArr);

    // set participants label
    const label = participantsArr.reduce((acc, curr) => {
        return acc.concat(`${curr.username}, `)
    }, '');
    setParticipantsLabel(label.slice(0, label.length - 2));
  }

  const addConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    // TODO: check if participants has length 0 -> if length 0, prompt user to add usernames. can't create conv without participants
    if (!participants.length) {
      // use mui textfield error -> update a state variable responsible for showing error
      return;
    }

    // create conversation, set new conversation id
    axios
      .post('/api/conversations', {
        participants: participants, // users that sender enters
        label: participantsLabel
      })
      .then((conversation) => {
        setCon(conversation.data);

        socket.emit('add-conversation', {
          id: conversation.data.id
        });
      })
      .then(() => {
        setAddingConversation(false);
        getAllConversations();
        setParticipantsEntry([]);
      })
      .catch((err) => {
        console.error('Failed to create a conversation:\n', err);
      });
  }

  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newCon: Conversations | null): void => {
    if (addingConversation) {
      setAddingConversation(false);
    }
    setCon(newCon);
    if (newCon) {
      setParticipantsLabel(newCon!.label);
    }
    setVisibleConversation(newCon);
  }

  const deleteConversation = () => {
    setCon(null);
    getAllConversations();
  }

  // add emitted conversation to allConversations
  socket.on('add-conversation', (conversation: Conversations): void => {
    setAllConversations([...allConversations, conversation]);
    getAllConversations();
  })

  return (
    <>
      <Grid container>
        <Grid item>
          <Typography variant="h3">
            Direct Messages
          </Typography>
        </Grid>
      </Grid>
      { loginError ? (
        <>
          <Grid container>
            <Grid item>
              <Typography variant="h1">
                You must be logged in to view conversations
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Button
            sx={{ marginBottom: 4 }}
            variant='contained'
            onClick={ beginConversation }
          >
            ➕ New Conversation
          </Button>
          <Grid container                                     // top most container for ConversationList and ConversationView
            component={Paper}
            spacing={{ md: 1.5, lg: 3}}
            sx={{
              width: '100%',
              height: '80vh',
            }}
          >
            <Grid container item                              // ConversationList container
              md={4}
              xs={12}
              sx={{
                border: 1,
                borderColor: '#8c959f',
                paddingLeft: 4,
              }}
            >
              <ConversationList
                allCons={ allConversations }
                visibleCon={ visibleConversation }
                setCons={ getAllConversations }
                select={ selectConversation }
                deleteCon={ deleteConversation }
              />
            </Grid>
            <Grid container item                                // ConversationView container
              md={8}
              xs={12}
              sx={{
                border: 1,
                borderColor: '#8c959f'
              }}
            >
              { addingConversation ? (
                  <form>
                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={allUsers.map((option) => option.username)}
                      value={ participantsEntry! }
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
                    <Button onClick={ addConversation }>Add Conversation</Button>
                  </form>
                ) : ('')
              }
              { con ? (
                <ConversationView
                  con={ con }
                  visibleCon={ visibleConversation }
                  addingConversation={ addingConversation }
                  label={ participantsLabel }
                />
                ) : ('')
              }
            </Grid>
          </Grid>
        </>
      )
      }
    </>
  );
}

export default Messages;
