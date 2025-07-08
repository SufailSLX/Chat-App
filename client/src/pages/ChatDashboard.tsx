// src/pages/ChatDashboard.tsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Loader from '../components/Loader';

export default function ChatDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Sample data
  const conversations = [
    { id: 1, name: 'Design Team', lastMessage: 'Let me check the mockups', time: '10:30 AM', unread: 2, online: true },
    { id: 2, name: 'Marketing Group', lastMessage: 'Campaign results are in!', time: 'Yesterday', unread: 0, online: false },
    { id: 3, name: 'John Doe', lastMessage: 'Meeting at 3pm?', time: 'Yesterday', unread: 5, online: true },
    { id: 4, name: 'Sarah Smith', lastMessage: 'Thanks for the feedback!', time: '7/20/23', unread: 0, online: false },
  ];

  const onlineUsers = [
    { id: 1, name: 'Alex Johnson', status: 'Available' },
    { id: 2, name: 'Maria Garcia', status: 'In a meeting' },
    { id: 3, name: 'David Kim', status: 'Available' },
    { id: 4, name: 'Lisa Wong', status: 'Do not disturb' },
  ];

  useEffect(() => {
    // Show loader for 3 seconds (shorter than login/register)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Initialize animations
    if (!isLoading && dashboardRef.current) {
      gsap.fromTo('.dashboard-item', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
      );
      
      gsap.fromTo('.online-user', 
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.3 }
      );
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f0f2f5] to-[#00B2FF]">
      {/* Sidebar */}
      <motion.div 
        ref={dashboardRef}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-80 bg-white shadow-xl rounded-r-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#0084FF] to-[#00B2FF] text-white">
          <motion.h1 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.02 }}
          >
            Hola Chat
          </motion.h1>
          <p className="text-sm opacity-90">Welcome back!</p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#E4E6EB]">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E4E6EB] focus:border-[#00B2FF] focus:ring-2 focus:ring-[#00B2FF]/20 transition-all"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-[#65676B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E4E6EB]">
          {['chats', 'contacts', 'groups'].map((tab) => (
            <motion.button
              key={tab}
              className={`flex-1 py-3 text-sm font-medium relative ${activeTab === tab ? 'text-[#00B2FF]' : 'text-[#65676B]'}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ backgroundColor: '#f5f5f5' }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#00B2FF]"
                  layoutId="tabIndicator"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo) => (
            <motion.div
              key={convo.id}
              className="dashboard-item p-4 border-b border-[#E4E6EB] flex items-center hover:bg-[#f9f9f9] cursor-pointer"
              whileHover={{ backgroundColor: '#f5f5f5' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative mr-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0084FF] to-[#00B2FF] flex items-center justify-center text-white font-bold">
                  {convo.name.charAt(0)}
                </div>
                {convo.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium text-[#050505] truncate">{convo.name}</h3>
                  <span className="text-xs text-[#65676B]">{convo.time}</span>
                </div>
                <p className="text-sm text-[#65676B] truncate">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <motion.div 
                  className="ml-2 w-5 h-5 bg-[#FA3E3E] text-white text-xs rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {convo.unread}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* New Chat Button */}
        <motion.button
          className="m-4 p-3 bg-gradient-to-r from-[#0084FF] to-[#00B2FF] text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 178, 255, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 border-b border-[#E4E6EB] flex items-center">
          <div className="relative mr-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0084FF] to-[#00B2FF] flex items-center justify-center text-white font-bold">
              D
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-medium text-[#050505]">Design Team</h2>
            <p className="text-xs text-[#65676B]">5 members, 3 online</p>
          </div>
          <div className="ml-auto flex space-x-3">
            <motion.button
              className="text-[#65676B] hover:text-[#00B2FF]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </motion.button>
            <motion.button
              className="text-[#65676B] hover:text-[#00B2FF]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </motion.button>
            <motion.button
              className="text-[#65676B] hover:text-[#00B2FF]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#f0f2f5] bg-opacity-50">
          <div className="space-y-3">
            {/* Sample messages */}
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="max-w-xs md:max-w-md bg-[#E4E6EB] rounded-2xl p-3 text-[#050505]">
                <p>Hey team, I've updated the mockups for the new dashboard</p>
                <p className="text-xs text-[#65676B] mt-1 text-right">10:15 AM</p>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="max-w-xs md:max-w-md bg-[#0084FF] text-white rounded-2xl p-3">
                <p>Looks great! The new layout is much cleaner</p>
                <p className="text-xs text-blue-100 mt-1 text-right">10:18 AM</p>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="max-w-xs md:max-w-md bg-[#E4E6EB] rounded-2xl p-3 text-[#050505]">
                <p>Let me know if you need any changes before I send to the dev team</p>
                <p className="text-xs text-[#65676B] mt-1 text-right">10:20 AM</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white bg-opacity-90 backdrop-blur-sm border-t border-[#E4E6EB]">
          <div className="flex items-center">
            <motion.button
              className="text-[#65676B] hover:text-[#00B2FF] mr-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </motion.button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full border border-[#E4E6EB] focus:border-[#00B2FF] focus:ring-2 focus:ring-[#00B2FF]/20 transition-all"
            />
            <motion.button
              className="ml-3 w-10 h-10 bg-gradient-to-r from-[#0084FF] to-[#00B2FF] text-white rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Online Users Sidebar */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-64 bg-white bg-opacity-90 backdrop-blur-sm border-l border-[#E4E6EB] p-4 overflow-y-auto"
      >
        <h3 className="font-medium text-[#050505] mb-4">Online Members (3)</h3>
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <motion.div
              key={user.id}
              className="online-user flex items-center p-2 rounded-lg hover:bg-[#f5f5f5] cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <div className="relative mr-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0084FF] to-[#00B2FF] flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#050505]">{user.name}</h4>
                <p className="text-xs text-[#65676B]">{user.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}