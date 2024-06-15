import { User, Post, Tags, Blog } from '@prisma/client';

export interface UserProfileType extends User {
  posts: PostWithRelations[];
  tags: Tags[];
  blogs: Blog[];
  followedBy: User[];
  following: User[];
}

export interface PostWithRelations extends Post {
  author: User;
  tags: Tags[];
}
