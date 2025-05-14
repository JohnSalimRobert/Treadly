import React from 'react';
import PostCard from '../../components/Card/PostCard';

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
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 font-threadly text-threadly-text bg-threadly-background min-h-screen">
      <h2 className="text-xl font-semibold font-threadly">Your Feed</h2>

      {/* Create Post Card */}
      <PostCard mode="create" />

      {/* Post list */}
      {dummyPosts.map((post) => (
        <PostCard
          key={post.id}
          mode="view"
          post={post}
        />
      ))}

      {/* TODO: Infinite scroll trigger goes here */}
    </div>
  );
};

export default PostFeed;
