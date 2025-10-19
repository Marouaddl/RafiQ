import React, { useState } from "react";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import RightSidebar from "../Components/RightSidebar";
import PostModal from "../Components/PostModal"

const Home = () => {
  const [posts, setPosts] = useState([ // تغيير post إلى posts
    {
      id: 1,
      user: {
        name: 'Dr. Maroua Djili',
        avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
        role: 'Psychiatre',
        verified: true
      },
      content: 'Aujourd\'hui, je voulais partager avec vous quelques techniques de respiration pour gérer le stress. La cohérence cardiaque est une méthode simple et efficace : 5 secondes d\'inspiration, 5 secondes d\'expiration, pendant 5 minutes.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      timestamp: '2h',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      isSaved: false,
      commentsList: [
        {
          id: 1,
          user: 'Ahmed Ali',
          text: 'Merci pour ce conseil Docteur ! Je vais essayer dès aujourd\'hui.',
          time: '1h',
          likes: 2,
          isLiked: false
        },
        {
          id: 2,
          user: 'Inas Chaala',
          text: 'Je pratique cette technique depuis 2 semaines et je vois déjà la différence !',
          time: '45min',
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Groupe Méditation',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        role: 'Groupe de soutien',
        verified: true
      },
      content: '🎯 Séance de méditation guidée ce soir à 20h ! Thème : "Lâcher prise et acceptation". Rejoignez-nous pour 30 minutes de détente profonde. Accessible à tous les niveaux.',
      timestamp: '5h',
      likes: 42,
      comments: 12,
      shares: 7,
      isLiked: true,
      isSaved: true,
      commentsList: [
        {
          id: 1,
          user: 'Fares Chaima',
          text: 'Parfait timing, j\'en avais besoin aujourd\'hui !',
          time: '4h',
          likes: 3,
          isLiked: false
        }
      ]
    }
  ]);

  const [showPostModal, setShowModal] = useState(false);

  // وظيفة إنشاء منشور جديد
  const handleCreatePost = (newPostData) => {
    const newPostObj = {
      id: Date.now(),
      user: {
        name: 'Ahmed Ali',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        role: 'Membre',
        verified: false
      },
      ...newPostData,
      timestamp: 'Maintenant',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      commentsList: []
    };
    setPosts([newPostObj, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
        : post
    ));
  };

  const handleSave = (postId) => { // تم إضافة const
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    alert('Post partagé !');
  };

  const handleAddComment = (postId, commentText) => {
    if (commentText.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? {
            ...post,
            comments: post.comments + 1,
            commentsList: [
              ...post.commentsList,
              {
                id: Date.now(),
                user: 'Vous',
                text: commentText,
                time: 'Maintenant',
                likes: 0,
                isLiked: false
              }
            ]
          }
          : post
      ));
    }
  };

  const handleLikeComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          commentsList: post.commentsList.map(comment =>
            comment.id === commentId
              ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
              }
              : comment
          )
        }
        : post
    ));
  };

  return (
    <div className="flex">
      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex justify-center">
        <div className="max-w-2xl w-full mx-4">
          <div className="space-y-3">
            <CreatePost onShowModal={() => setShowModal(true)} />

            {/* قائمة المنشورات */}
            {posts.map((post) => ( // تغيير post إلى posts و post إلى Post
              <Post
                key={post.id}
                post={post}
                onLike={handleLike}
                onSave={handleSave}
                onShare={handleShare}
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
              />
            ))}
          </div>
        </div>
      </div>

      {/* الشريط الجانبي الأيمن */}
      <RightSidebar />

      {/* نافذة إنشاء المنشور */}
      {showPostModal && (
        <PostModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
};

export default Home;