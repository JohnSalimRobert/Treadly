import React, { useEffect, useState } from 'react';
import PostCard from '../../components/Card/PostCard';
import { fetchPosts } from '../../services/postService';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSocketContext } from '../../context/SocketContext';
import type { Post } from '../../types/postCardTypes';
import type { Comment } from '../../types/commentTypes';



const PostFeed: React.FC = () => {
  const socketContext = useSocketContext();
  const socket = socketContext?.socket;
  const [posts, setPosts] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loadPosts = async () => {
    try {
      const res: any = await fetchPosts({ limit: 5, cursor });
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
      const updatedPosts = [...prev];
      if (postIndex === -1) {
        return [newPost, ...updatedPosts];
      } else {
        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],
          ...newPost,
        };
      }
      return updatedPosts;
    })
  }

  const handleComments = (Comment: Comment | undefined) => {
    if(!Comment) return;
    setPosts(prev => {
      const postIndex = prev.findIndex(curPost => curPost._id === Comment.post);
      if (postIndex === -1) return prev;
      const updatedPosts = [...prev];
      const commentIndex = updatedPosts[postIndex].comments.findIndex((comment: Comment) => comment._id === Comment._id);
      if (commentIndex !== -1) {
        updatedPosts[postIndex].comments[commentIndex] = {...updatedPosts[postIndex].comments[commentIndex], ...Comment};
      } else {
        updatedPosts[postIndex].comments.push(Comment);
      }
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
      <PostCard mode="create" handlePostUpdates={handlePostUpdates} />

      {/* Post list */}
      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
        loader={<p className="text-center">Loading...</p>}
        endMessage={<p className="text-center text-gray-500">No more posts</p>}
      >
        {posts.map((post) => (
          <PostCard key={post._id} mode="view" handleComments={handleComments} handlePostUpdates={handlePostUpdates} post={post} socket={socket} />
        ))}
      </InfiniteScroll>

      {/* TODO: Infinite scroll trigger goes here */}
    </div>
  );
};

export default PostFeed;
