import { User, Post, Tags, Blog, Repo, File, Messages, Conversations } from '@prisma/client';
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
  aboutMe: string;
  bio: string;
}

export interface SimpleUser {
  id: number;
  name: string;
  username: string;
  picture: string | null;
}

export interface Comment {
  id: number,
  body: string,
  author: SimpleUser,
  createdAt: Date,
  liked: {id: number}[],
  likedByUser?: boolean,
}

export interface PostWithRelations extends Post {
  author: SimpleUser;
  tags: Tags[];
  repo?: RepoWithFiles | null;
  liked: { id: number }[];
  likedByUser?: boolean;
  comments?: Comment[]
}

export interface RepoWithFiles extends Repo {
  files: File[];
}

export interface MessageWithMetadata extends Messages {
  sender: User;
}

export interface ConversationWithParticipants extends Conversations {
  participants: User[];
}

export interface BlogPosts {
  devId: User[];
  mediumId: User[];
  id: number;
  title: string;
  url: string;
  cover_image: string;
  description: string;
}
