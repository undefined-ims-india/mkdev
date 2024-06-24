import React, {ReactElement} from "react";
import parse from 'html-react-parser';
import markdownit from 'markdown-it';
const md = markdownit();

import Box  from "@mui/material/Box";

const MarkDown = ({text}:{text: string}) :ReactElement => {
  return (
    <Box sx={{marginBottom: -2, marginTop: -2}}>
      {parse(md.render(text))}
    </Box>
  )
}

export default MarkDown;