import React, { useState } from 'react';
import { MessageSquare, Users, Plus, Heart, MessageCircle, Clock, User, Shield, AlertCircle } from 'lucide-react';
import { User as UserType } from '../App';
import { Link } from 'react-router-dom';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'student' | 'volunteer';
  timestamp: Date;
  replies: number;
  lastActivity: Date;
  category: string;
  isAnonymous: boolean;
  supportCount: number;
  tags: string[];
}

interface PeerSupportProps {
  user: UserType | null;
}

const PeerSupport: React.FC<PeerSupportProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    isAnonymous: true,
    tags: '',
  });

  const categories = [
    { id: 'all', name: 'All Topics', color: 'bg-gray-100 text-gray-700' },
    { id: 'anxiety', name: 'Anxiety Support', color: 'bg-blue-100 text-blue-700' },
    { id: 'depression', name: 'Depression', color: 'bg-purple-100 text-purple-700' },
    { id: 'academic', name: 'Academic Stress', color: 'bg-green-100 text-green-700' },
    { id: 'relationships', name: 'Relationships', color: 'bg-pink-100 text-pink-700' },
    { id: 'general', name: 'General Support', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'success', name: 'Success Stories', color: 'bg-teal-100 text-teal-700' },
  ];

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Dealing with exam anxiety - what works for you?',
      content: 'I\'ve been struggling with severe anxiety before exams. My mind goes blank and I panic even though I\'ve studied. Looking for practical tips that have actually worked for others.',
      author: 'Anonymous',
      authorRole: 'student',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      replies: 23,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      category: 'anxiety',
      isAnonymous: true,
      supportCount: 15,
      tags: ['exams', 'anxiety', 'study-tips'],
    },
    {
      id: '2',
      title: 'Success Story: From struggling to thriving',
      content: 'A year ago I was in a really dark place. Failed several classes, felt completely alone. Today I want to share what helped me turn things around...',
      author: 'Sarah M.',
      authorRole: 'student',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      replies: 41,
      lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      category: 'success',
      isAnonymous: false,
      supportCount: 87,
      tags: ['success-story', 'depression', 'recovery'],
    },
    {
      id: '3',
      title: 'Roommate conflicts affecting my mental health',
      content: 'Living situation is becoming unbearable. Constant tension and conflict. It\'s affecting my sleep, studies, and overall well-being. Anyone dealt with similar situations?',
      author: 'Anonymous',
      authorRole: 'student',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      replies: 17,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      category: 'relationships',
      isAnonymous: true,
      supportCount: 12,
      tags: ['roommates', 'conflict', 'living-situation'],
    },
    {
      id: '4',
      title: 'Volunteer Perspective: Healthy Coping Strategies',
      content: 'As a peer support volunteer, I wanted to share some evidence-based coping strategies that many students find helpful...',
      author: 'Alex (Volunteer)',
      authorRole: 'volunteer',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      replies: 8,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: 'general',
      isAnonymous: false,
      supportCount: 34,
      tags: ['coping-strategies', 'mental-health', 'volunteer-tips'],
    },
    {
      id: '5',
      title: 'Feeling overwhelmed by course load',
      content: 'Taking 18 credits this semester and working part-time. Feel like I\'m drowning. How do you prioritize when everything feels urgent?',
      author: 'Anonymous',
      authorRole: 'student',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      replies: 29,
      lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      category: 'academic',
      isAnonymous: true,
      supportCount: 19,
      tags: ['time-management', 'workload', 'stress'],
    },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log('Creating new post:', newPost);
    setShowNewPostModal(false);
    setNewPost({
      title: '',
      content: '',
      category: 'general',
      isAnonymous: true,
      tags: '',
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Peer Support Community</h2>
          <p className="text-gray-600 mb-6">
            Connect with fellow students in our moderated support community. Share experiences, 
            get advice, and support others on their mental health journey.
          </p>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Login to Join Community
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Peer Support Community</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A safe, moderated space for students to connect, share experiences, and support each other. 
            All posts are monitored by trained volunteers to ensure a positive environment.
          </p>
        </div>

        {/* Community Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Community Guidelines</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Be respectful and supportive of all community members</li>
                <li>• Share experiences constructively and avoid giving medical advice</li>
                <li>• Use trigger warnings when discussing sensitive topics</li>
                <li>• Report concerning content to our volunteer moderators</li>
                <li>• Remember that anonymity is protected but not required</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Crisis Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 font-medium">
              If you're in crisis or having thoughts of self-harm, please reach out immediately:
            </p>
            <a
              href="tel:988"
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
            >
              Call 988
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <button
                  onClick={() => setShowNewPostModal(true)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Post</span>
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? category.color
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Members</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Posts This Week</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Volunteer Moderators</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          categories.find(c => c.id === post.category)?.color || 'bg-gray-100 text-gray-700'
                        }`}>
                          {categories.find(c => c.id === post.category)?.name}
                        </span>
                        {post.authorRole === 'volunteer' && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Volunteer
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-green-600 cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-3">{post.content}</p>
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimeAgo(post.timestamp)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.supportCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.replies} replies</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">Support</span>
                      </button>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts in this category</h3>
                <p className="text-gray-500">Be the first to start a conversation!</p>
              </div>
            )}
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
                  <button
                    onClick={() => setShowNewPostModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCreatePost}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="What's on your mind?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Share your thoughts, experiences, or ask for support..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (optional)
                      </label>
                      <input
                        type="text"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="anxiety, study-tips, relationships (comma-separated)"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={newPost.isAnonymous}
                        onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="anonymous" className="text-sm text-gray-700">
                        Post anonymously
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewPostModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerSupport;