import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const PostHeader = ({ post }) => {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src={post.user.avatar} 
            alt={post.user.name} 
            className="w-8 h-8 rounded-full border border-[#30A196]"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-xs text-gray-900">{post.user.name}</h3>
              {post.user.verified && (
                <span className="text-[#30A196] text-xs">✓</span>
              )}
            </div>
            <p className="text-[10px] text-gray-500">{post.user.role} • {post.timestamp}</p>
          </div>
        </div>
        <div className="relative">
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreHorizontal className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;