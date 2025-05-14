type PostUser ={
    username: string;
    profilePic?: string;
}

type Comment = {
    id: string;
    user: PostUser;
    content: string;
    likes: number;
};

type Post = {
    id: string;
    user: PostUser;
    text: string;
    images: string[];
    likes: number;
    comments: Comment[];
};

export type PostCardProps = {
    mode: 'create' | 'view';
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    post?: Post;
};