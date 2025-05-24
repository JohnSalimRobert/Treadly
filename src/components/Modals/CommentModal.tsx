// src/components/Comments/CommentsModal.tsx
import { useState } from 'react';
import { FormBuilder } from '../FormBuilder/FormBuilder';
import type { Comment, CommentsModalProps } from '../../types/commentTypes';
import { commentSchema, type CommentFormType } from '../../schemas/commentSchema';
import { commentConfig } from '../../config/commentConfig';
import { ThumbsUp } from 'lucide-react';
import Timestamp from '../UI/Timestamp';
import Modal from '../UI/Modal';

export default function CommentsModal({
  comments,
  onClose,
  handleAddComment,
  handleAddReply,
  handleLikeComment,
}: CommentsModalProps) {
  const [replyTo, setReplyTo] = useState<string | null>(null);
if(handleAddComment === undefined || handleAddReply === undefined || handleLikeComment === undefined) return;
  const renderReplies = (replies: Comment[]) => {
    return replies.map((reply) => (
      <div
        key={reply._id}
        className="ml-8 mt-2 border-l border-gray-300 pl-4"
      >
        <div className="flex items-start gap-2">
          <img
            src={reply.author.profilePicture}
            alt={reply.author.username}
            width={24}
            height={24}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{reply.author.username}</p>
            <p className="text-sm">{reply.content}</p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
             <Timestamp createdAt={reply.createdAt} />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const header = <h2 className="text-lg font-bold">Comments</h2>;

  const body = (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="border-b border-gray-200 pb-4"
        >
          <div className="flex items-start gap-3">
            <img
              src={comment.author.profilePicture}
              alt={comment.author.username}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{comment.author.username}</p>
              <p className="text-sm">{comment.content}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1 gap-4">
                <Timestamp createdAt={comment.createdAt} />

                {/* Like Section */}
                <div
                  onClick={() => {
                    handleLikeComment(comment._id)
                    setReplyTo(null); // Reset replyTo when liking a comment
                }}
                  className="flex items-center gap-1 cursor-pointer text-threadly-primary hover:underline"
                >
                  <ThumbsUp
                    size={14}
                    className={`text-threadly-primary ${
                      comment.isLikedByUser ? 'fill-threadly-primary' : ''
                    }`}
                  />
                  <span>{comment.likes.length}</span>
                </div>

                <button
                  onClick={() =>
                    setReplyTo(replyTo === comment._id ? null : comment._id)
                  }
                  className="text-threadly-primary hover:underline"
                >
                  Reply
                </button>
              </div>

              {/* Replies */}
              {comment.replies && renderReplies(comment.replies)}

              {/* Reply Form */}
              {replyTo === comment._id && (
                <div className="mt-2 ml-8">
                  <FormBuilder
                    schema={commentSchema}
                    config={commentConfig}
                    onSubmit={(data) => handleAddReply(data, comment._id)}
                    buttonText="Add Reply"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {comments.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          No comments yet. Be the first!
        </p>
      )}

      <FormBuilder
        schema={commentSchema}
        config={commentConfig}
        onSubmit={handleAddComment}
        buttonText="Add Comment"
      />
    </div>
  );

  return <Modal header={header} body={body} onClose={onClose} />;
}
