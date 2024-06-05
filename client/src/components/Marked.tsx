import React, {ReactElement} from "react";
import parse from 'html-react-parser';
import markdownit from 'markdown-it';
const md = markdownit();

const Marked = ({text}:{text: string}) :ReactElement => {
  return (
    <>
      {parse(md.render(text))}
    </>
  )
}

export default Marked;