import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Marked from './Marked'

const PostCreationPage = () :ReactElement => {

  const navigate = useNavigate();
  const [title, setTitle]: [string, Function] = useState('');
  const [body, setBody]: [string, Function] = useState('');

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) :void => {
    let setStateFunc :Function
    if (e.target.name === 'Post Title') {
      setStateFunc = setTitle;
    }
    else if (e.target.name === 'Post Body') {
      setStateFunc = setBody;
    }
    else {
      return;
    }
    setStateFunc(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!title.length || !body.length) {return}
    const newPost:{title:string, body:string} = {title, body};
    axios.post('/api/posts', {newPost})
      .then(() :void => {
        navigate('/dashboard')
      })
  }

  return (
  <div className=' flex flex-row flex-grow ml-3 mt-3'>
    <h1>Create Post</h1>
    <fieldset>
        <label>Title</label>
        <input
          value={title}
          onChange={handleTextInput}
          name="Post Title"
          type="text"
          placeholder="Title"
           className="block border-solid border-2"
          />
        <label className="block">Body</label>
        <textarea
          value={body}
          onChange={handleTextInput}
          name="Post Body"
          placeholder="Body Text"
           className="block border-solid border-2"
        />
        <button onClick={handleSubmit} >Submit</button>
    </fieldset>
  </>
  )
}

export default PostCreationPage;