'use client';
import React, { useEffect, useState } from 'react';
import { fetchUser } from '../../services/userService';

interface UserStats {
  postCount: number;
  commentCount: number;
  likedPostsCount: number;
  totalLikesReceived: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      // You can replace this with actual userId (e.g., from route params or auth)
      const response: any = await fetchUser();
      const { data} = response;

      setUser(data.user);
      setStats(data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-threadly-background">
        <p className="text-threadly-text font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-threadly-background">
        <p className="text-threadly-error font-semibold">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-threadly-background text-threadly-text font-threadly flex flex-col items-center py-12">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture || '/default-avatar.png'}
            alt={user.username}
            className="w-24 h-24 rounded-full object-cover border-4 border-threadly-secondary"
          />
          <h2 className="text-xl font-bold mt-4">{user.username}</h2>
          <p className="text-threadly-muted text-sm">{user.email}</p>
          {user.bio && <p className="mt-2 text-center text-threadly-muted">{user.bio}</p>}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-threadly-secondary rounded-lg p-4 text-center">
            <p className="text-sm text-threadly-text">Posts</p>
            <p className="text-2xl font-bold">{stats?.postCount ?? 0}</p>
          </div>
          <div className="bg-threadly-accent rounded-lg p-4 text-center">
            <p className="text-sm text-threadly-text">Comments</p>
            <p className="text-2xl font-bold">{stats?.commentCount ?? 0}</p>
          </div>
          <div className="bg-threadly-success/80 rounded-lg p-4 text-center">
            <p className="text-sm text-threadly-text">Liked Posts</p>
            <p className="text-2xl font-bold">{stats?.likedPostsCount ?? 0}</p>
          </div>
          <div className="bg-threadly-warning/80 rounded-lg p-4 text-center">
            <p className="text-sm text-threadly-text">Likes Received</p>
            <p className="text-2xl font-bold">{stats?.totalLikesReceived ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Fun footer */}
      <p className="mt-6 text-threadly-muted text-xs">Keep shining ✨</p>
    </div>
  );
};

export default ProfilePage;
