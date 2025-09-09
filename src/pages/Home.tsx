import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, BookOpen, Users, BarChart3, Shield, Clock, Heart } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Guided Support',
      description: 'Get immediate help with our AI-powered chat that provides coping strategies and connects you to professionals when needed.',
      link: '/ai-chat',
      color: 'bg-blue-500',
    },
    {
      icon: Calendar,
      title: 'Book Appointments',
      description: 'Schedule confidential sessions with on-campus counselors or access mental health helplines.',
      link: '/booking',
      color: 'bg-teal-500',
    },
    {
      icon: BookOpen,
      title: 'Resource Hub',
      description: 'Access videos, relaxation audio, and wellness guides available in multiple languages.',
      link: '/resources',
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect with fellow students in our moderated support community with trained volunteers.',
      link: '/peer-support',
      color: 'bg-green-500',
    },
  ];

  const stats = [
    { label: 'Students Supported', value: '2,500+', icon: Heart },
    { label: 'Available 24/7', value: '365 days', icon: Clock },
    { label: 'Confidential Sessions', value: '100%', icon: Shield },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Your Mental Health
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Matters</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A comprehensive digital mental health platform designed specifically for students. 
            Get support, connect with peers, and access resources - all in a safe, confidential environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ai-chat"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Get Support Now
            </Link>
            <Link
              to="/resources"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers multiple ways to get help, connect with others, and build mental wellness skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${feature.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-12 bg-red-50 border-t-4 border-red-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Need Immediate Help?</h2>
          <p className="text-red-700 mb-6">
            If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for immediate support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:988"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Call Crisis Line: 988
            </a>
            <Link
              to="/ai-chat"
              className="bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-semibold"
            >
              Chat with AI Support
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">MindCare</span>
              </div>
              <p className="text-gray-300">
                Supporting student mental health with comprehensive digital tools and resources.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/ai-chat" className="text-gray-300 hover:text-white transition-colors">AI Support</Link></li>
                <li><Link to="/booking" className="text-gray-300 hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
                <li><Link to="/peer-support" className="text-gray-300 hover:text-white transition-colors">Peer Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Crisis Line: 988</li>
                <li>Campus Security: (555) 123-4567</li>
                <li>Student Health: (555) 123-4568</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MindCare. All rights reserved. Confidential and secure.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;