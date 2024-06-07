import React, { useState, ReactElement } from 'react';
import io from 'socket.io-client';

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
    socket.emit('message', text);
    setText('');
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
