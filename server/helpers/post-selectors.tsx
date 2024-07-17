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
  },
  orderBy: [
    { createdAt: 'desc'}
  ]
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
  repo: { include: { files: true }},
  liked: {select: {id:true}},
  comments: commentSelector,
}