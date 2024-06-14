import { User, Post, Tags, Blog } from '@prisma/client';

export interface UserProfileType extends User {
  posts: PostWithRelations[],
  tags: Tags[],
  blogs: Blog[]
}

export interface PostWithRelations extends Post {
  author: User,
  tags: Tags[]
}