import React from 'react';

const Comment = ({ comment, onLike }) => {
  return (
    <div className="flex space-x-2">
      <img 
        src={`https://randomuser.me/api/portraits/${comment.user === 'Vous' ? 'men' : 'women'}/33.jpg`} 
        alt={comment.user} 
        className="w-5 h-5 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-100 rounded p-2">
          <div className="flex justify-between items-start">
            <span className="font-medium text-[10px] text-gray-900">{comment.user}</span>
            <span className="text-[10px] text-gray-500">{comment.time}</span>
          </div>
          <p className="text-[10px] text-gray-700 mt-0.5">{comment.text}</p>
        </div>
        <div className="flex space-x-3 mt-1">
          <button 
            onClick={onLike}
            className={`text-[10px] transition-colors ${
              comment.isLiked ? 'text-[#30A196] font-medium' : 'text-gray-500 hover:text-[#30A196]'
            }`}
          >
            J'aime ({comment.likes})
          </button>
          <button className="text-[10px] text-gray-500 hover:text-[#30A196] transition-colors">
            Répondre
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;