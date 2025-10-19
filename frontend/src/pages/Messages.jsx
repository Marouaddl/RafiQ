import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSearch, 
  FiMoreVertical, 
  FiImage, 
  FiSmile, 
  FiSend, 
  FiVideo, 
  FiPhone, 
  FiPaperclip,
  FiMic,
  FiMapPin,
  FiUser,
  FiCheck,
  FiCheckCircle,
  FiMenu
} from 'react-icons/fi';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  // بيانات المحادثات
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: 'Dr. Sophie Martin',
        avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
        role: 'Psychiatre',
        online: true,
        verified: true
      },
      messages: [
        {
          id: 1,
          text: 'Bonjour Ahmed, comment allez-vous ?',
          time: '10:30',
          isMe: false,
          status: 'delivered',
          type: 'text'
        },
        {
          id: 2,
          text: 'Bonjour Docteur, je vais mieux.',
          time: '10:32',
          isMe: true,
          status: 'read',
          type: 'text'
        }
      ],
      unread: 0,
      pinned: true
    },
    {
      id: 2,
      user: {
        name: 'Groupe Méditation',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        role: 'Groupe de soutien',
        online: true,
        verified: true
      },
      messages: [
        {
          id: 1,
          text: 'Séance de méditation à 20h !',
          time: '09:15',
          isMe: false,
          status: 'delivered',
          type: 'text'
        }
      ],
      unread: 2,
      pinned: false
    }
  ]);

  const emojis = ['😊', '😂', '❤️', '👍', '🙏', '😍', '🔥', '💪', '🎉', '🤔'];

  // التمرير التلقائي للأسفل
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages, isTyping]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const messageData = {
        id: Date.now(),
        text: newMessage,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        status: 'sent',
        type: 'text',
        replyTo: replyMessage
      };

      const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedChat.id) {
          // حفظ فقط آخر رسالتين لمنع التمرير
          const updatedMessages = [...conv.messages, messageData].slice(-2);
          return {
            ...conv,
            messages: updatedMessages,
            unread: 0
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      setSelectedChat(updatedConversations.find(conv => conv.id === selectedChat.id));
      setNewMessage('');
      setReplyMessage(null);
      
      // محاكاة تسليم وقراءة الرسالة
      setTimeout(() => {
        const deliveredConversations = updatedConversations.map(conv => {
          if (conv.id === selectedChat.id) {
            const updatedMessages = conv.messages.map(msg => 
              msg.id === messageData.id ? { ...msg, status: 'delivered' } : msg
            );
            return { ...conv, messages: updatedMessages };
          }
          return conv;
        });
        setConversations(deliveredConversations);
        setSelectedChat(deliveredConversations.find(conv => conv.id === selectedChat.id));
      }, 1000);

      // محاكاة الرد التلقائي
      if (selectedChat.user.role === 'Psychiatre') {
        setIsTyping(true);
        setTimeout(() => {
          const autoReplyConversations = deliveredConversations.map(conv => {
            if (conv.id === selectedChat.id) {
              const replyMessage = {
                id: Date.now() + 1,
                text: 'Merci pour votre message.',
                time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                isMe: false,
                status: 'delivered',
                type: 'text'
              };
              const updatedMessages = [...conv.messages, replyMessage].slice(-2);
              return {
                ...conv,
                messages: updatedMessages
              };
            }
            return conv;
          });
          setConversations(autoReplyConversations);
          setSelectedChat(autoReplyConversations.find(conv => conv.id === selectedChat.id));
          setIsTyping(false);
        }, 2000);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVideoCall = () => {
    alert(`Appel vidéo avec ${selectedChat.user.name}`);
  };

  const handleVoiceCall = () => {
    alert(`Appel vocal avec ${selectedChat.user.name}`);
  };

  const markAsRead = (conversationId) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unread: 0 } : conv
    ));
  };

  const handleReply = (message) => {
    setReplyMessage(message);
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voiceMessage = {
        id: Date.now(),
        text: 'Message vocal',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        status: 'sent',
        type: 'voice',
        duration: '0:15'
      };

      const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedChat.id) {
          const updatedMessages = [...conv.messages, voiceMessage].slice(-2);
          return {
            ...conv,
            messages: updatedMessages
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      setSelectedChat(updatedConversations.find(conv => conv.id === selectedChat.id));
    }, 2000);
  };

  const sendLocation = () => {
    const locationMessage = {
      id: Date.now(),
      text: '📍 Position',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent',
      type: 'location'
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedChat.id) {
        const updatedMessages = [...conv.messages, locationMessage].slice(-2);
        return {
          ...conv,
          messages: updatedMessages
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedChat(updatedConversations.find(conv => conv.id === selectedChat.id));
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return <FiCheck className="text-gray-400 text-xs" />;
      case 'delivered': return <FiCheck className="text-gray-400 text-xs" />;
      case 'read': return <FiCheckCircle className="text-[#30A196] text-xs" />;
      default: return <FiCheck className="text-gray-400 text-xs" />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Zone de discussion principale - على اليسار */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200">
        {selectedChat ? (
          <>
            {/* En-tête de la discussion */}
            <div className="bg-white border-b border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiMenu className="text-gray-600 text-sm" />
                  </button>
                  <div className="relative">
                    <img
                      src={selectedChat.user.avatar}
                      alt={selectedChat.user.name}
                      className="w-8 h-8 rounded-lg border border-[#30A196]"
                    />
                    {selectedChat.user.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h2 className="font-semibold text-gray-900 text-sm">
                        {selectedChat.user.name}
                      </h2>
                      {selectedChat.user.verified && (
                        <span className="text-[#30A196] text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {selectedChat.user.online ? 'En ligne' : 'Hors ligne'} • {selectedChat.user.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={handleVoiceCall}
                    className="p-1.5 text-gray-600 hover:text-[#30A196] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiPhone className="text-sm" />
                  </button>
                  <button 
                    onClick={handleVideoCall}
                    className="p-1.5 text-gray-600 hover:text-[#30A196] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiVideo className="text-sm" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiMoreVertical className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 bg-gray-50 overflow-hidden">
              <div className="h-full flex flex-col justify-end space-y-2">
                {selectedChat.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.isMe ? 'text-right' : 'text-left'}`}>
                      {message.replyTo && (
                        <div className={`mb-1 p-2 bg-gray-100 rounded border-l-2 border-[#30A196] ${
                          message.isMe ? 'text-left' : 'text-left'
                        }`}>
                          <p className="text-[10px] text-gray-500 font-medium">
                            Réponse à {message.replyTo.isMe ? 'vous' : message.replyTo.sender || selectedChat.user.name}
                          </p>
                          <p className="text-xs text-gray-700 truncate">
                            {message.replyTo.text}
                          </p>
                        </div>
                      )}
                      
                      <div
                        className={`inline-flex flex-col ${
                          message.isMe
                            ? 'bg-[#30A196] text-white rounded-xl rounded-br-none'
                            : 'bg-white text-gray-900 rounded-xl rounded-bl-none border border-gray-200'
                        }`}
                      >
                        {message.type === 'voice' && (
                          <div className="flex items-center space-x-2 px-2 pt-2">
                            <div className="flex space-x-0.5">
                              <div className="w-0.5 h-2 bg-current rounded-full animate-pulse"></div>
                              <div className="w-0.5 h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-0.5 h-2.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                            <span className="text-xs">{message.duration}</span>
                          </div>
                        )}
                        
                        {message.type === 'location' && (
                          <div className="flex items-center space-x-1 px-2 pt-2">
                            <FiMapPin className="text-xs" />
                            <span className="text-xs">Position</span>
                          </div>
                        )}
                        
                        <div className="px-2 pb-1.5 pt-1">
                          <p className="text-xs leading-relaxed">{message.text}</p>
                        </div>
                        
                        <div className={`px-2 pb-1.5 flex items-center space-x-1 ${
                          message.isMe ? 'justify-between' : 'justify-end'
                        }`}>
                          <span className="text-[10px] opacity-75">
                            {message.time}
                          </span>
                          {message.isMe && (
                            <div className="flex items-center">
                              {getStatusIcon(message.status)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!message.isMe && (
                        <div className="mt-0.5 flex space-x-1 justify-start">
                          <button 
                            onClick={() => handleReply(message)}
                            className="text-[10px] text-gray-500 hover:text-[#30A196] transition-colors"
                          >
                            Répondre
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-xl rounded-bl-none px-2 py-1.5">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-0.5">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">écriture...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Reply Preview */}
            {replyMessage && (
              <div className="bg-gray-100 border-t border-gray-200 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500 font-medium">Répondre à {replyMessage.isMe ? 'vous' : replyMessage.sender || selectedChat.user.name}</p>
                    <p className="text-xs text-gray-700 truncate">{replyMessage.text}</p>
                  </div>
                  <button 
                    onClick={() => setReplyMessage(null)}
                    className="text-gray-400 hover:text-gray-600 ml-1 text-sm"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Input d'envoi de message */}
            <div className="bg-white border-t border-gray-200 p-2">
              <div className="flex items-end space-x-2">
                {/* Boutons d'actions */}
                <div className="flex space-x-0.5">
                  <button className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded transition-colors">
                    <FiPaperclip className="text-sm" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded transition-colors">
                    <FiImage className="text-sm" />
                  </button>
                  <button 
                    onClick={sendLocation}
                    className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded transition-colors"
                  >
                    <FiMapPin className="text-sm" />
                  </button>
                </div>
                
                {/* Zone de texte */}
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Écrivez votre message..."
                    rows="1"
                    className="w-full bg-gray-100 rounded-lg px-2 py-1.5 text-xs border-none outline-none focus:ring-1 focus:ring-[#30A196] resize-none"
                  />
                  
                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-full mb-1 bg-white border border-gray-200 rounded-lg p-2 shadow-lg">
                      <div className="grid grid-cols-5 gap-1">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => handleEmojiSelect(emoji)}
                            className="p-1 hover:bg-gray-100 rounded text-sm transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Boutons d'envoi */}
                <div className="flex space-x-0.5">
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded transition-colors"
                  >
                    <FiSmile className="text-sm" />
                  </button>
                  
                  {isRecording ? (
                    <button 
                      onClick={() => setIsRecording(false)}
                      className="p-1 text-red-500 bg-red-50 hover:bg-red-100 rounded transition-colors animate-pulse"
                    >
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </button>
                  ) : (
                    <button 
                      onClick={startRecording}
                      className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded transition-colors"
                    >
                      <FiMic className="text-sm" />
                    </button>
                  )}
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-1 rounded transition-colors ${
                      newMessage.trim()
                        ? 'bg-[#30A196] text-white hover:bg-[#00796B]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <FiSend className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Écran quand aucune discussion n'est sélectionnée
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiSend className="text-lg text-gray-400" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Sélectionnez une conversation
              </h3>
              <p className="text-gray-500 text-xs">
                Choisissez une discussion pour commencer
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar des conversations - على اليمين */}
      <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
        {/* En-tête */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-bold text-gray-900">Messages</h1>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <FiUser className="text-base text-gray-600" />
            </button>
          </div>
          
          {/* Barre de recherche */}
          <div className="relative mt-2">
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-100 rounded-lg text-xs border-none focus:outline-none focus:ring-1 focus:ring-[#30A196]"
            />
          </div>
        </div>

        {/* Liste des conversations */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full">
            {filteredConversations.slice(0, 4).map(conversation => (
              <div
                key={conversation.id}
                onClick={() => {
                  setSelectedChat(conversation);
                  markAsRead(conversation.id);
                }}
                className={`p-2 border-b border-gray-100 cursor-pointer transition-all ${
                  selectedChat?.id === conversation.id 
                    ? 'bg-[#30A196] bg-opacity-5 border-r-2 border-[#30A196]' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {conversation.user.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center space-x-1">
                        <h3 className="font-semibold text-xs text-gray-900 truncate">
                          {conversation.user.name}
                        </h3>
                        {conversation.user.verified && (
                          <span className="text-[#30A196] text-[10px]">✓</span>
                        )}
                        {conversation.pinned && (
                          <span className="text-yellow-500 text-[10px]">📌</span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap">
                        {conversation.messages[conversation.messages.length - 1].time}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] text-gray-500">
                        {conversation.user.role}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-[#30A196] text-white text-[10px] rounded-full px-1 py-0.5 min-w-3 text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[10px] text-gray-600 truncate leading-tight">
                      {conversation.messages[conversation.messages.length - 1].text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;