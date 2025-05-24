import type { Socket } from "socket.io-client";


type PostUser ={
    _id: string;
    username: string;
    profilePicture?: string;
}

type Comment = {
    _id: string;
    author: PostUser;
    content: string;
    likes: string[];
    post: string;
    createdAt: string;
    replies?: Comment[];
};

export type Post = {
    _id: string;
    author: PostUser;
    caption: string;
    images: string[];
    likes: PostUser[];
    comments?: Comment[];
    createdAt: string;
    isLikedByUser?: boolean;
};

export type PostCardProps = {
    mode: 'create' | 'view';
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    post?: Post;
    socket?: Socket| null;
    handlePostUpdates?: (post: Post) => void;
    handleComments?: (comment: Comment) => void;
};