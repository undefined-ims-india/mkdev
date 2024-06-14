import React, {ReactElement, useState} from "react";
import { PostWithRelations } from "../../../types";

import Card from "@mui/material/Card";

const Post = ({content} : {content: PostWithRelations}): ReactElement => {
  return (
    <Card>
      {content.title}
      {content.body}
    </Card>
  )
};

export default Post;