export const commentSelector = {
  select: {
    id: true,
    body: true,
    createdAt: true,
    liked: { select:{ id: true }},
    author: { select :{
      id: true,
      username: true,
      name: true,
      picture: true
    }},
  }
}

export const simpleUserSelector = {
  select :{
    id: true,
    username: true,
    name: true,
    picture: true
  }
}

export const postWithRelationsSelector = {
  author: simpleUserSelector,
  tags: true,
  liked: {select: {id:true}},
  comments: commentSelector,
}