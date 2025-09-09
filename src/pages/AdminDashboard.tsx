import React, { useState } from 'react';
import { BarChart3, Users, MessageSquare, Calendar, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';
import { User as UserType } from '../App';
import { Link } from 'react-router-dom';

interface AdminDashboardProps {
  user: UserType | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Mock data for analytics
  const stats = {
    totalUsers: 2847,
    activeUsers: 1523,
    totalSessions: 8934,
    avgSessionDuration: '12 min',
    crisisInterventions: 23,
    appointmentsBooked: 156,
    resourceViews: 4521,
    peerSupportPosts: 89,
  };

  const trends = {
    users: { value: 12.3, direction: 'up' },
    sessions: { value: 8.7, direction: 'up' },
    crisis: { value: 2.1, direction: 'down' },
    satisfaction: { value: 15.4, direction: 'up' },
  };

  const recentActivities = [
    {
      id: '1',
      type: 'crisis',
      message: 'Crisis intervention triggered for user ID #2847',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'resolved',
    },
    {
      id: '2',
      type: 'appointment',
      message: 'High-priority appointment booked with Dr. Wilson',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'pending',
    },
    {
      id: '3',
      type: 'resource',
      message: 'New mental health resource added (Spanish)',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: '4',
      type: 'peer',
      message: 'Peer support post flagged for review',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'pending',
    },
  ];

  const usageData = [
    { hour: '00:00', aiChat: 12, booking: 3, resources: 8, peer: 5 },
    { hour: '02:00', aiChat: 8, booking: 1, resources: 4, peer: 2 },
    { hour: '04:00', aiChat: 5, booking: 0, resources: 2, peer: 1 },
    { hour: '06:00', aiChat: 15, booking: 2, resources: 6, peer: 3 },
    { hour: '08:00', aiChat: 45, booking: 12, resources: 23, peer: 15 },
    { hour: '10:00', aiChat: 67, booking: 18, resources: 34, peer: 22 },
    { hour: '12:00', aiChat: 89, booking: 25, resources: 45, peer: 31 },
    { hour: '14:00', aiChat: 78, booking: 22, resources: 38, peer: 28 },
    { hour: '16:00', aiChat: 92, booking: 15, resources: 41, peer: 35 },
    { hour: '18:00', aiChat: 76, booking: 8, resources: 32, peer: 24 },
    { hour: '20:00', aiChat: 54, booking: 4, resources: 26, peer: 18 },
    { hour: '22:00', aiChat: 32, booking: 2, resources: 15, peer: 12 },
  ];

  const mentalHealthTrends = [
    { category: 'Anxiety', count: 234, change: 12.3, color: 'bg-blue-500' },
    { category: 'Depression', count: 189, change: -4.2, color: 'bg-purple-500' },
    { category: 'Academic Stress', count: 156, change: 18.7, color: 'bg-green-500' },
    { category: 'Relationship Issues', count: 98, change: 7.3, color: 'bg-pink-500' },
    { category: 'Sleep Issues', count: 87, change: 23.4, color: 'bg-yellow-500' },
    { category: 'Social Anxiety', count: 76, change: 5.8, color: 'bg-teal-500' },
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <BarChart3 className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            This dashboard is only accessible to administrators. Please contact your system administrator if you believe you should have access.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Mental Health System Analytics & Management</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <span className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Users', 
              value: stats.totalUsers.toLocaleString(), 
              trend: trends.users, 
              icon: Users, 
              color: 'bg-blue-500' 
            },
            { 
              label: 'AI Chat Sessions', 
              value: stats.totalSessions.toLocaleString(), 
              trend: trends.sessions, 
              icon: MessageSquare, 
              color: 'bg-green-500' 
            },
            { 
              label: 'Crisis Interventions', 
              value: stats.crisisInterventions, 
              trend: trends.crisis, 
              icon: AlertTriangle, 
              color: 'bg-red-500' 
            },
            { 
              label: 'Appointments Booked', 
              value: stats.appointmentsBooked, 
              trend: trends.satisfaction, 
              icon: Calendar, 
              color: 'bg-purple-500' 
            },
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.trend.direction === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  metric.trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend.value}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last {selectedTimeframe}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Usage Patterns */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Platform Usage Patterns</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="text-gray-600">Time</div>
                <div className="text-blue-600">AI Chat</div>
                <div className="text-green-600">Booking</div>
                <div className="text-purple-600">Resources</div>
              </div>
              {usageData.slice(6, 10).map((data, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-sm text-gray-600">{data.hour}</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(data.aiChat / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{data.aiChat}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(data.booking / 30) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{data.booking}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(data.resources / 50) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{data.resources}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'crisis' ? 'bg-red-100' :
                    activity.type === 'appointment' ? 'bg-blue-100' :
                    activity.type === 'resource' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'crisis' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                    {activity.type === 'appointment' && <Calendar className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'resource' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.type === 'peer' && <MessageSquare className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mental Health Trends */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Mental Health Issue Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentalHealthTrends.map((trend, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-800">{trend.category}</h3>
                  <div className="flex items-center space-x-1">
                    {trend.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      trend.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {Math.abs(trend.change)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${trend.color}`}></div>
                  <span className="text-2xl font-bold text-gray-800">{trend.count}</span>
                  <span className="text-sm text-gray-500">cases</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">System Health</h2>
            <div className="space-y-4">
              {[
                { service: 'AI Chat Service', status: 'operational', uptime: '99.9%' },
                { service: 'Booking System', status: 'operational', uptime: '99.7%' },
                { service: 'Database', status: 'operational', uptime: '99.8%' },
                { service: 'File Storage', status: 'maintenance', uptime: '98.2%' },
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'operational' ? 'bg-green-500' :
                      service.status === 'maintenance' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-800">{service.service}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{service.uptime}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.status === 'operational' ? 'bg-green-100 text-green-700' :
                      service.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Resource Performance</h2>
            <div className="space-y-4">
              {[
                { type: 'Video Content', views: 1234, rating: 4.8 },
                { type: 'Audio Sessions', plays: 987, rating: 4.9 },
                { type: 'Guides & Articles', downloads: 2345, rating: 4.7 },
                { type: 'Peer Support Posts', engagements: 567, rating: 4.6 },
              ].map((resource, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{resource.type}</p>
                    <p className="text-xs text-gray-500">
                      {resource.views && `${resource.views} views`}
                      {resource.plays && `${resource.plays} plays`}
                      {resource.downloads && `${resource.downloads} downloads`}
                      {resource.engagements && `${resource.engagements} engagements`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{resource.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;