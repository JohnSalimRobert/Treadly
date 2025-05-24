import { Heart, MessageCircle } from 'lucide-react';
import type { PostCardProps } from '../../types/postCardTypes';
import { FormBuilder } from '../FormBuilder/FormBuilder';
import { postSchema } from '../../schemas/postSchema';
import { postConfig } from '../../config/postConfig';
import { uploadImages } from '../../lib/cloudnary/uploadImages';
import { normalizeCloudinaryUrls } from '../../utils/normalizeUploadResult';
import toast from 'react-hot-toast';
import { createPost } from '../../services/postService';
import { useEffect, useState } from 'react';
import CommentsModal from '../Modals/CommentModal';
import Timestamp from '../UI/Timestamp';
import type { CommentFormType } from '../../schemas/commentSchema';
import LikesModal from '../Modals/LikesModal';

const PostCard: React.FC<PostCardProps> = ({ mode, header, body, footer, post, socket, handlePostUpdates, handleComments }) => {
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
    const [showLikesModal, setShowLikesModal] = useState(false);

    if (mode === 'create'){
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
          if (handlePostUpdates) {
            console.log(response)
            handlePostUpdates(response.data.data);
          }
          } else {
            return response.sucess;
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

  const handleShowComment = () => {
    setOpenCommentsModal(true);
    
  }

  const handleLikePost = () => {
    if (!socket) return;

    socket.emit("like:post", {
      postId: post._id,
    });

  }
    const handleAddComment = (data: CommentFormType) => {
    if (!socket) return;
    socket.emit('create:comment', {
      content: data.content,
      postId: post._id,
    });
  };

  const handleAddReply = (data: CommentFormType, parentId: string) => {
    console.log('New reply to:', parentId, 'Reply data:', data);
    if(!socket) return;
    socket.emit('create:comment', {
        content: data.content,
        postId: post._id,
        parentId: parentId,
    }) 
   };

  const handleLikeComment = (commentId: string) => {
    if (!socket) return;
    socket.emit('like:comment', { commentId });
  };


  useEffect(() => {
    if (!socket) return;

    socket.on("post:liked", (data) => {
      if(data.success && data.data){
        if (handlePostUpdates) {
          handlePostUpdates(data.data);
        }
      }
    });

    socket.on("comment:liked", (data)=>{
      if(data.success && data.data){
      if(handleComments) {
        handleComments(data.data);
      }}
    })

    socket.on("comment:created", (data) => {
      if(data.success && data.data){
        if(handleComments) {
          handleComments(data.data);
        }
      }
    })

    return () => {
      socket.off("post:liked");
      socket.off("comment:liked");
      socket.off("comment:created");
    } 
  },[]);

  const mostLikedComment = post.comments?.reduce((max, comment) => 
    comment.likes > max.likes ? comment : max
  , post.comments?.[0]);
    
  return (
    <div className="bg-neutral-100 rounded-lg shadow p-4 my-2 space-y-4 font-threadly text-threadly-text">
      {header ?? (
        <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={post.author.profilePicture}
            alt={post.author.username}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{post.author.username}</span>
        </div>
          <Timestamp createdAt={post.createdAt} />
        </div>
      )}

      {body ?? (
        <div className="space-y-2">
          <p>{post.caption}</p>
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
            <span onClick={() => setShowLikesModal(true)}>{post.likes.length || 0} Likes</span>
            <span onClick={handleShowComment} >{post?.comments ? post?.comments.length : 0} Comments</span>
          </div>

          <div className="flex gap-4">
            <button onClick={handleLikePost} className="flex items-center gap-1 text-sm hover:text-threadly-error">
              <Heart className={`w-4 h-4 ${post.isLikedByUser? "fill-red-500 text-red-500" : ""}`} />
              Like
            </button>
            <button onClick={handleShowComment} className="flex items-center gap-1 text-sm hover:text-threadly-primary">
              <MessageCircle className="w-4 h-4" />
              Comment
            </button>
          </div>

          {mostLikedComment && (
            <div className="bg-threadly-secondary p-3 rounded text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{mostLikedComment.author.username}</span>
                <span className="text-threadly-muted">{mostLikedComment.likes.length} likes</span>
              </div>
              <p>{mostLikedComment.content}</p>
              <div className="flex gap-3 mt-1 text-xs text-threadly-primary">
                <button >Like</button>
                <button>Reply</button>
              </div>
            </div>
          )}
        </div>
      )}
      {openCommentsModal && <CommentsModal
        socket={socket}
        onClose={() => setOpenCommentsModal(false)}
        comments={post.comments || []}
        postId={post._id}
        handleAddComment={handleAddComment}
        handleAddReply={handleAddReply}
        handleLikeComment={handleLikeComment}
        />}
        {showLikesModal && (
        <LikesModal
          postId={post._id}
          onClose={() => setShowLikesModal(false)}
        />
      )}
    </div>
  );
};

export default PostCard;
