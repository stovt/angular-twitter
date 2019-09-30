import { User } from './user';

export class Tweet {
  id: number;
  body: string;
  createdAt: string;
  user: User;
  userId: number;
  childrenAmount: number;
  likesCount: number;
  liked: boolean;
}

export type Tweets = Tweet[];

// @ts-ignore
export type TweetsByUserId = Record<number, Tweet[]>;
