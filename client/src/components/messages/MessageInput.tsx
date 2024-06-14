import React, { useState, ReactElement } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:4000');

interface PropsType {
  con: {
    id: number;
    participants: { username: string }[];
  };
}

const MessageInput: React.FC<PropsType> = (props): ReactElement => {
  const { con } = props;

  const [text, setText] = useState('');

  const handleText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  }

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    // only send message if there is text in input field
    if (text) {
      // broadcast the message to all the clients
      socket.emit('message', {
        body: text,
        // TODO: senderId -> how to include here?
        conversationId: con.id
      });
      setText('');

      // send message to database with current conversation
      axios
        .post(`/api/messages/${con.id}`, {
          message: {
            body: text
          }
        })
        .catch((err) => {
          console.error('Failed to post message to db', err.cause);
        });

    }

  }

  return (
    <div>
      <form>
        <input value={ text } onChange={ handleText } />
        <button onClick={ sendMessage } >
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
