import { Heart, MessageCircle } from 'lucide-react';
import type { PostCardProps } from '../../types/postCardTypes';
import { FormBuilder } from '../FormBuilder/FormBuilder';
import { postSchema } from '../../schemas/postSchema';
import { postConfig } from '../../config/postConfig';
import { uploadImages } from '../../lib/cloudnary/uploadImages';
import { normalizeCloudinaryUrls } from '../../utils/normalizeUploadResult';
import toast from 'react-hot-toast';
import { createPost } from '../../services/postService';

const PostCard: React.FC<PostCardProps> = ({ mode, header, body, footer, post }) => {
    if (mode === 'create') {
        const onSubmit = async (data: { caption: string; images: File[] }) => {
          const files = data.images;
          const uploadResult = await uploadImages(files);
          const normalizedProfilePicure = normalizeCloudinaryUrls(uploadResult, files.length > 1); 
          const payload = {
            ...data,
            images: normalizedProfilePicure,
          };
          const response: any = await toast.promise(
            createPost(payload),
            {
              loading: "Creating post...",
              success: "Post created successfully!",
              error: (error) => {
                console.error("Error creating post:", error);
                if (error.response.data.message) {
                  return error.response.data.message;
                }
                return "Error creating post. Please try again.";
              }

        }).finally(() => toast.dismiss());
        if(response.success){
            // Handle successful post creation (e.g., update state, navigate, etc.)
            console.log("Post created successfully:", response);
          }
      }
        return (
          <div className="bg-threadly-background rounded-lg shadow p-4 space-y-4 font-threadly text-threadly-text">
            {header}
            
            {/* Using FormBuilder for dynamic form creation */}
            <FormBuilder
              schema={postSchema}
              config={postConfig}
              onSubmit={onSubmit}
            />
          </div>
        );
      }

  if (!post) return null;

  const mostLikedComment = [...post.comments].sort((a, b) => b.likes - a.likes)[0];

  return (
    <div className="bg-threadly-background rounded-lg shadow p-4 space-y-4 font-threadly text-threadly-text">
      {header ?? (
        <div className="flex items-center gap-3">
          <img
            src={post.user.profilePic}
            alt={post.user.username}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{post.user.username}</span>
        </div>
      )}

      {body ?? (
        <div className="space-y-2">
          <p>{post.text}</p>
          {post.images.length > 0 && (
            <div className="flex overflow-x-auto gap-2">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`post-${idx}`}
                  className="w-40 h-40 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {footer ?? (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-threadly-muted">
            <span>{post.likes} Likes</span>
            <span>{post.comments.length} Comments</span>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-sm hover:text-threadly-error">
              <Heart className="w-4 h-4" />
              Like
            </button>
            <button className="flex items-center gap-1 text-sm hover:text-threadly-primary">
              <MessageCircle className="w-4 h-4" />
              Comment
            </button>
          </div>

          {mostLikedComment && (
            <div className="bg-threadly-secondary p-3 rounded text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{mostLikedComment.user.username}</span>
                <span className="text-threadly-muted">{mostLikedComment.likes} likes</span>
              </div>
              <p>{mostLikedComment.content}</p>
              <div className="flex gap-3 mt-1 text-xs text-threadly-primary">
                <button>Like</button>
                <button>Reply</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
