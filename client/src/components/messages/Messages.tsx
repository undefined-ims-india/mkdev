import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';

interface Conversation {
  id: number;
}

const Messages = (): ReactElement => {

  // TODO: upon user click of conversationList item, conversation id should be changed and passed down to conversation view

  const [conId, setConId] = useState<number>(0);
  const [allConversations, setAllConversations] = useState<Conversation[]>([])

  // TODO: use similar logic for a selectConversation function
  const handleAddConversation = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    console.log('click');

    // create conversation, get conversation id
    axios
      .post('/api/conversations', {})
      .then((conversation) => {
        const { id } = conversation.data;

        setConId(id);
      })
      .catch((err) => {
        console.error('Failed to create a conversation:\n', err);
      });
  }

  // get array of conversations
  useEffect(() => {
    axios
      .get('/api/conversations')
      .then((conversations) => {
        setAllConversations(conversations.data);
      })
      .catch((err) => {
        console.error('Failed to retrieve conversations:\n', err);
      })

  }, [])


  return (
    <div>
      <h1>Direct Messages</h1>
      <button onClick={ handleAddConversation }>➕</button>
      <ConversationList allCons={ allConversations }/>
      { conId ? <ConversationView conId={ conId }/> : '' }
    </div>
  );
}

export default Messages;
