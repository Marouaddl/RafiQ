import React from 'react';

const PostStats = ({ post }) => {
  return (
    <div className="px-3 py-1.5 border-t border-b border-gray-100 flex justify-between text-[10px] text-gray-500">
      <div className="flex items-center space-x-4">
        <span>{post.likes} j'aime</span>
        <span>{post.comments} commentaires</span>
        <span>{post.shares} partages</span>
      </div>
    </div>
  );
};

export default PostStats;