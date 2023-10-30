import { PostData } from '../interfaces/post-data';

export interface CommentData {
    id: number;
    author: string | null;
    postId: number;
    content: string | null;
    likeCount: number;
    dislikeCount: number;
    createdAt: Date;
    post: PostData | null;
  }