import { CommentData } from '../interfaces/comment-data';

export interface PostData {
    id: number;
    author: string | null;
    title: string | null;
    content: string | null;
    likeCount: number;
    dislikeCount: number;
    createdAt: Date;
    comments: CommentData[] | null;
  }