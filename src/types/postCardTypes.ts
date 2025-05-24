import type { Socket } from "socket.io-client";


type PostUser ={
    _id: string;
    username: string;
    profilePicture?: string;
}

type Comment = {
    id: string;
    author: PostUser;
    content: string;
    likes: string[];
};

export type Post = {
    _id: string;
    author: PostUser;
    caption: string;
    images: string[];
    likes: PostUser[];
    comments?: Comment[];
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
};