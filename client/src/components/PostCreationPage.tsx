import React, { ReactElement, useState } from 'react';
import { Input, Fieldset, Field, Label, Textarea, Button } from '@headlessui/react';

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
    <Fieldset>
      <Field>
        <Label className="block">Title</Label>
        <Input
          value={title}
          onChange={handleTextInput}
          name="Post Title"
          type="text"
          placeholder="Title"
           className="block"
          />
      </Field>
      <Field>
        <Label className="block">Body</Label>
        <Textarea
          value={body}
          onChange={handleTextInput}
          name="Post Body"
          placeholder="Body Text"
           className="block"
        />
      </Field>
      <Field>
        <Button onClick={handleSubmit} >Submit</Button>
      </Field>
    </Fieldset>
  </>
  )
}

export default PostCreationPage;