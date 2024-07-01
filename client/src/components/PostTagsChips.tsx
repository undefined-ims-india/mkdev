import React from "react";
import { Tags } from "@prisma/client";
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

export default ({tags}: {tags: Tags[]}) => (
  <Box sx={{display:"flex", flexDirection:'row', alignItems: 'center'}}>
  {
    tags.map((tag, index) => (
      <Chip
        label={tag.name}
        variant="outlined"
        size="medium"
        key={tag.name + index}
      />
    ))
  }
</Box>
)