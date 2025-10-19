import React from 'react';
import { FiSend } from 'react-icons/fi';
import Comment from './Comment';

const CommentsSection = ({ post, newComment, onNewCommentChange, onAddComment, onLikeComment }) => {
  return (
    <div className="border-t border-gray-100 p-3">
      {/* Liste des commentaires existants */}
      <div className="space-y-2 mb-3">
        {post.commentsList.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onLike={() => onLikeComment(post.id, comment.id)}
          />
        ))}
      </div>

      {/* Ajouter un commentaire */}
      <div className="flex space-x-2">
        <img 
          src="https://randomuser.me/api/portraits/men/41.jpg" 
          alt="Votre avatar" 
          className="w-5 h-5 rounded-full"
        />
        <div className="flex-1 flex space-x-1">
          <input
            type="text"
            placeholder="Écrivez un commentaire..."
            value={newComment}
            onChange={(e) => onNewCommentChange(e.target.value)}
            className="flex-1 bg-gray-100 rounded-full px-2 py-1 text-[10px] border-none outline-none"
          />
          <button 
            onClick={onAddComment}
            className="bg-[#30A196] text-white px-2 py-1 rounded-full text-[10px] hover:bg-[#00796B] transition-colors"
          >
            <FiSend className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;