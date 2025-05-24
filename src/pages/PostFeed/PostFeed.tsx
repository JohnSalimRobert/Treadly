import React, { useEffect, useState } from 'react';
import PostCard from '../../components/Card/PostCard';
import { fetchPosts } from '../../services/postService';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSocketContext } from '../../context/SocketContext';
import type { Post } from '../../types/postCardTypes';

// Dummy post data
const dummyPosts = [
  {
    id: "1",
    user: {
      username: 'john_doe',
      profilePic: 'https://i.pravatar.cc/100?img=1',
    },
    text: 'Had a great day exploring Tailwind v4!',
    images: ['https://source.unsplash.com/random/300x300'],
    likes: 23,
    comments: [
      {
        id: "1",
        user: { username: 'jane_smith' },
        content: 'Looks awesome!',
        likes: 10,
      },
      {
        id: "2",
        user: { username: 'dev_guy' },
        content: 'Tailwind v4 is 🔥',
        likes: 15,
      },
    ],
  },
  {
    id: "2",
    user: {
      username: 'frontend_fan',
      profilePic: 'https://i.pravatar.cc/100?img=2',
    },
    text: 'Working on a new UI kit. Feedback welcome!',
    images: [],
    likes: 17,
    comments: [
      {
        id: "3",
        user: { username: 'ui_critic' },
        content: 'Share some previews!',
        likes: 5,
      },
    ],
  },
];


const PostFeed: React.FC = () => {
  const socketContext = useSocketContext();
  const socket = socketContext?.socket;
  const [posts, setPosts] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  console.log(posts)
  const loadPosts = async () => {
    try {
      const res: any = await fetchPosts({ limit: 5, cursor });
      console.log('Fetched posts:', res);
      setPosts((prev) => {
        const existingIds = new Set(prev.map(post => post._id));
        const newPosts = res.data.filter((post: any) => !existingIds.has(post._id));
        return [...prev, ...newPosts];
      });      
      setCursor(res.nextCursor);
      setHasMore(res.hasMore);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostUpdates = (newPost: Post | undefined) => {
    if(!newPost) return;
    setPosts(prev => {
      const postIndex = prev.findIndex(curPost => curPost._id === newPost._id);
      if (postIndex === -1) return prev;
      const updatedPosts = [...prev];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        ...newPost,
      };
      return updatedPosts;
    })
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 font-threadly text-threadly-text bg-threadly-background min-h-screen">
      <h2 className="text-xl font-semibold font-threadly">Your Feed</h2>

      {/* Create Post Card */}
      <PostCard mode="create" />

      {/* Post list */}
      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
        loader={<p className="text-center">Loading...</p>}
        endMessage={<p className="text-center text-gray-500">No more posts</p>}
      >
        {posts.map((post) => (
          <PostCard key={post._id} mode="view" handlePostUpdates={handlePostUpdates} post={post} socket={socket} />
        ))}
      </InfiniteScroll>

      {/* TODO: Infinite scroll trigger goes here */}
    </div>
  );
};

export default PostFeed;
