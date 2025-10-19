import React, { useState } from 'react';
import { FiImage, FiSmile, FiX } from 'react-icons/fi';

const PostModal = ({ onClose, onSubmit }) => {
  const [newPost, setNewPost] = useState({
    content: '',
    image: null
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const moods = ['😊', '😢', '😡', '😴', '😌', '🤗', '💪', '🎯'];

  const handleCreatePost = () => {
    if (newPost.content.trim() || newPost.image) {
      onSubmit(newPost);
      setNewPost({ content: '', image: null });
      setSelectedImage(null);
      onClose();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setNewPost({ ...newPost, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setNewPost({ ...newPost, image: null });
  };

  const selectMood = (mood) => {
    setNewPost({ ...newPost, content: `${newPost.content} ${mood}` });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-sm">Créer une publication</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="text-lg" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://randomuser.me/api/portraits/men/41.jpg" 
              alt="Votre avatar" 
              className="w-8 h-8 rounded-full border border-[#30A196]"
            />
            <div>
              <p className="font-medium text-xs">Ahmed Ali</p>
              <p className="text-[10px] text-gray-500">Membre</p>
            </div>
          </div>

          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Quoi de neuf, Ahmed ?"
            className="w-full border-none outline-none resize-none text-sm placeholder-gray-500 min-h-[100px]"
          />

          {selectedImage && (
            <div className="relative mt-3">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
              >
                <FiX className="text-xs" />
              </button>
            </div>
          )}

          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Ajouter une humeur :</p>
            <div className="flex flex-wrap gap-1">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => selectMood(mood)}
                  className="text-lg hover:scale-110 transition-transform"
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-3">
            <label className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer">
              <FiImage className="text-[#30A196]" />
              <span>Photo/Vidéo</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <button className="flex items-center space-x-2 text-xs text-gray-600">
              <FiSmile className="text-yellow-500" />
              <span>Humeur</span>
            </button>
          </div>
          
          <button
            onClick={handleCreatePost}
            disabled={!newPost.content.trim() && !newPost.image}
            className={`w-full py-2 rounded-lg text-xs font-medium transition-colors ${
              newPost.content.trim() || newPost.image
                ? 'bg-[#30A196] text-white hover:bg-[#00796B]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;