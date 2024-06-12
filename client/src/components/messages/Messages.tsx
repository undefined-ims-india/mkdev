import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Conversation {
  id: number;
}

interface User {
  id: number; // refers to db generated id
}

const Messages = (): ReactElement => {

  const [conId, setConId] = useState<number>(0);
  const [addingConversation, setAddingConversation] = useState<boolean>(false);
  const [recipients, setRecipients] = useState<User[]>([]);
  const [participants, setParticipants] = useState<string>('');
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);
  const [loginError, setLoginError] = useState<boolean>(false);

  // get all current conversations TODO: *** per user: the only conversations listed should be the ones the user is a part of
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

  const beginConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    setAddingConversation(true);
    setParticipants('');
  }

  const addConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    // from input field, use input to look up user id
    //    input should look up username or first name? to find user id
    //    if input is not valid, prompt user to only send to valid user

    // create conversation, set new conversation id
    axios
    .post('/api/conversations', {
      receivers: [] // users that sender enters TODO: state variable or use event to get input value
    })
    .then((conversation) => {
      const { id } = conversation.data;
      setConId(id);
      socket.emit('add-conversation', {
        id: conId
      });
    })
    .then(() => {

      getAllConversations();
    })
    .catch((err) => {
      console.error('Failed to create a conversation:\n', err);
    });
  }

  const handleParticipantsInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setParticipants(e.target.value);
  }

  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number): void => {
    setConId(newId);
  }

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
          <h3> You must be logged in to view conversation</h3>
        </>
      ) : (
        <>
          <button onClick={ beginConversation }>➕</button>
          <ConversationList allCons={ allConversations } select={ selectConversation }/>
          { addingConversation ? (
              <form>
                <input value={ participants } onChange={ handleParticipantsInput } placeholder="username" />
                <button onClick={ addConversation }>Add Conversation</button>
              </form>
            ) : ('')
          }
          { conId ?
            <ConversationView
              addingConversation={ addingConversation }
              addConversation={ beginConversation }
              conId={ conId }
            /> : ''
          }
        </>
      )
      }
    </div>
  );
}

export default Messages;
