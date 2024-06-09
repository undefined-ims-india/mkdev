import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Conversation {
  id: number;
}

const Messages = (): ReactElement => {

  const [conId, setConId] = useState<number>(0);
  const [allConversations, setAllConversations] = useState<Conversation[]>([])

  // get all current conversations
  const getAllConversations = (): void => {
    axios
      .get('/api/conversations')
      .then((conversations) => {
        setAllConversations(conversations.data);
      })
      .catch((err) => {
        console.error('Failed to retrieve conversations:\n', err);
      })
  }

  // get list of conversations upon page load
  useEffect(() => {
    getAllConversations();
  }, [])

  const handleAddConversation = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {

    // create conversation, set new conversation id
    axios
      .post('/api/conversations', {})
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
      <button onClick={ handleAddConversation }>➕</button>
      <ConversationList allCons={ allConversations } select={ selectConversation }/>
      { conId ? <ConversationView conId={ conId }/> : '' }
    </div>
  );
}

export default Messages;
