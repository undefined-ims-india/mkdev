import React, { useState, ReactElement } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:4000');

const MessageInput = (): ReactElement => {
  const [text, setText] = useState('');

  const handleText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
    // console.log('text input: ', text);
  }

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    // console.log('sent text', text);
    // broadcast the message to all the clients (through server)
    socket.emit('message', {
      body: text
      // senderId -> how to include here?
    });
    setText('');

    // send POST request to /api/messages
    // TODO: need to get conversation id and interpolate it into post url
    axios
      .post('/api/messages/1', {
        message: {
          body: text
        }
      })
      .then(() => {
        // console.log('message posted to db');
      })
      .catch((err) => {
        console.error('Failed to post message to db', err.cause);
      });
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
