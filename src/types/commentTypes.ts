import { Socket } from 'socket.io-client';
export type Comment = {
  _id: string;
  post: string;
  author: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  content: string;
  likes: string[];
  createdAt: string;
  replies?: Comment[];
  isLikedByUser?: boolean;
};

export type CommentsModalProps = {
  comments: Comment[];
  onClose: () => void;
  socket?: Socket | null;
  postId?: string;
  handleAddComment?: (data: { content: string }) => void;
  handleAddReply?: (data: { content: string }, parentId: string) => void;
  handleLikeComment?: (commentId: string) => void;
};