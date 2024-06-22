import { User, Post, Tags, Blog, Repo, File } from '@prisma/client';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}

export interface UserProfile extends User {
  posts: PostWithRelations[];
  tags: Tags[];
  blogs: Blog[];
  followedBy: User[];
  following: User[];
}

export interface PostWithRelations extends Post {
  author: User;
  tags: Tags[];
  repo?: RepoWithFiles | null;
}

export interface RepoWithFiles extends Repo {
  files: File[]
}
