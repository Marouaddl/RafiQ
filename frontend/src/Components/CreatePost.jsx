import React from 'react';
import {FiImage , FiVideo , FiSmile} from 'react-icons/fi';


const CreatePost = ({onShowModal}) => {
    return(
        <div className='bg-white rounded-lg border-gray-200 p-3'>
            <div className='flex items-center space-x-2 mb-3'>
                <img
                 src="https://randomuser.me/api/portraits/men/41.jpg" 
                 alt="Votre avatar" 
                 className='w-8 h-8 rounded-full border border-[#30A196]'
                 />
                 <button
                 onClick={onShowModal}
                 className='flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-500 transition-colors'
                 >
                    Partagez vos pensées,Ahmed ...
                 </button>
            </div>
            <div className="flex justify-between border-t pt-2 text-xs">
        <button 
          onClick={onShowModal}
          className="flex items-center space-x-1 text-gray-500 hover:text-[#30A196] transition-colors"
        >
          <FiImage className="text-sm" />
          <span>Photo</span>
        </button>
        <button 
          onClick={onShowModal}
          className="flex items-center space-x-1 text-gray-500 hover:text-[#30A196] transition-colors"
        >
          <FiVideo className="text-sm" />
          <span>Vidéo</span>
        </button>
        <button 
          onClick={onShowModal}
          className="flex items-center space-x-1 text-gray-500 hover:text-[#30A196] transition-colors"
        > <FiSmile className="text-sm" />
          <span>Humeur</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;