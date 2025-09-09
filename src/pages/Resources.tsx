import React, { useState } from 'react';
import { Play, Download, BookOpen, Headphones, Video, Globe, Search, Filter } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide' | 'article';
  category: string;
  language: string;
  duration?: string;
  thumbnail: string;
  downloadUrl?: string;
  views?: number;
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Deep Breathing for Anxiety Relief',
      description: 'A guided 10-minute breathing exercise to help manage anxiety and panic attacks.',
      type: 'audio',
      category: 'Anxiety Management',
      language: 'English',
      duration: '10 min',
      thumbnail: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 2453,
    },
    {
      id: '2',
      title: 'Understanding Depression in Students',
      description: 'An educational video explaining depression symptoms and available support resources.',
      type: 'video',
      category: 'Depression Support',
      language: 'English',
      duration: '15 min',
      thumbnail: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 1876,
    },
    {
      id: '3',
      title: 'Mindfulness Meditation Guide',
      description: 'Learn the basics of mindfulness meditation with this comprehensive beginner\'s guide.',
      type: 'guide',
      category: 'Mindfulness',
      language: 'English',
      thumbnail: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
    },
    {
      id: '4',
      title: 'Manejo del Estrés Académico',
      description: 'Estrategias prácticas para manejar el estrés durante los períodos de exámenes.',
      type: 'video',
      category: 'Stress Management',
      language: 'Spanish',
      duration: '12 min',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 987,
    },
    {
      id: '5',
      title: 'Progressive Muscle Relaxation',
      description: 'A soothing 20-minute audio session for complete body relaxation and stress relief.',
      type: 'audio',
      category: 'Relaxation',
      language: 'English',
      duration: '20 min',
      thumbnail: 'https://images.pexels.com/photos/3820296/pexels-photo-3820296.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 3241,
    },
    {
      id: '6',
      title: 'Building Healthy Sleep Habits',
      description: 'Evidence-based strategies for improving sleep quality and establishing better sleep routines.',
      type: 'article',
      category: 'Sleep Health',
      language: 'English',
      thumbnail: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '7',
      title: 'সামাজিক উদ্বেগ মোকাবেলা',
      description: 'সামাজিক পরিস্থিতিতে উদ্বেগ কমানোর কৌশল এবং আত্মবিশ্বাস বৃদ্ধির উপায়।',
      type: 'guide',
      category: 'Social Anxiety',
      language: 'Bengali',
      thumbnail: 'https://images.pexels.com/photos/5699463/pexels-photo-5699463.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
    },
    {
      id: '8',
      title: 'Time Management for Students',
      description: 'Practical techniques for managing academic workload and reducing procrastination.',
      type: 'video',
      category: 'Academic Success',
      language: 'English',
      duration: '18 min',
      thumbnail: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 1654,
    },
  ];

  const categories = ['all', 'Anxiety Management', 'Depression Support', 'Mindfulness', 'Stress Management', 'Relaxation', 'Sleep Health', 'Social Anxiety', 'Academic Success'];
  const languages = ['all', 'English', 'Spanish', 'Bengali', 'French', 'Mandarin'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'guide': return BookOpen;
      case 'article': return BookOpen;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Mental Health Resources</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive library of mental health resources including videos, guided audio sessions, 
            and educational materials available in multiple languages.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language === 'all' ? 'All Languages' : language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = getResourceIcon(resource.type);
            
            return (
              <div
                key={resource.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {resource.type === 'video' || resource.type === 'audio' ? (
                        <Play className="h-16 w-16 text-white" />
                      ) : (
                        <Download className="h-16 w-16 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      resource.type === 'video' ? 'bg-red-100 text-red-800' :
                      resource.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                      resource.type === 'guide' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <IconComponent className="h-3 w-3 inline mr-1" />
                      {resource.type}
                    </span>
                    {resource.duration && (
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                        {resource.duration}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {resource.language}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {resource.category}
                    </span>
                    {resource.views && (
                      <span className="text-gray-500 text-xs">
                        {resource.views.toLocaleString()} views
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1">
                      {resource.type === 'video' || resource.type === 'audio' ? (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Play</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                    
                    <button className="text-gray-500 hover:text-gray-700 transition-colors p-2">
                      <BookOpen className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find relevant resources.
            </p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Personalized Resources?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI assistant can help you find resources tailored to your specific needs and current situation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ai-chat"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5" />
              Get AI Recommendations
            </a>
            <a
              href="/booking"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Talk to a Counselor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;