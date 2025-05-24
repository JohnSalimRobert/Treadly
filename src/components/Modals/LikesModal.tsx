// components/LikesModal.tsx
import { useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import { fetchUsersWhoLikedPost } from '../../services/postService';

interface LikesModalProps {
  postId: string;
  onClose: () => void;
}

export default function LikesModal({ postId, onClose }: LikesModalProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res: any = await fetchUsersWhoLikedPost(postId);
        setUsers(res.data || []);
      } catch (error) {
        console.error('Error fetching users who liked post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [postId]);

  return (
    <Modal
      header={<h2 className="text-lg font-semibold">Liked By</h2>}
      body={
        loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users liked this post.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user._id} className="flex items-center space-x-2">
                <img
                  src={user.profilePicture || '/default-avatar.png'}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        )
      }
      onClose={onClose}
    />
  );
}
