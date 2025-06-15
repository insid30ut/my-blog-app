import React from 'react';
import { Comment } from '@/models/Comment';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
          <p>{comment.content}</p>
          <p style={{ fontSize: '0.8em', color: '#666' }}>By {comment.authorId} on {new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;