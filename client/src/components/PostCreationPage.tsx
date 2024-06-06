import React, { ReactElement, useState } from 'react';

const PostCreationPage = () :ReactElement => {

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
    console.log(title, body);
  }

  return (
  <>
    <h1>Create Post</h1>
    <fieldset>
        <label>Title</label>
        <input
          value={title}
          onChange={handleTextInput}
          name="Post Title"
          type="text"
          placeholder="Title"
           className="block"
          />
        <label className="block">Body</label>
        <textarea
          value={body}
          onChange={handleTextInput}
          name="Post Body"
          placeholder="Body Text"
           className="block"
        />
        <button onClick={handleSubmit} >Submit</button>
    </fieldset>
  </>
  )
}

export default PostCreationPage;