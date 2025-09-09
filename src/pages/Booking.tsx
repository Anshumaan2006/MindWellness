import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Video, MapPin, CheckCircle } from 'lucide-react';
import { User as UserType } from '../App';
import { Link } from 'react-router-dom';

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  availability: string[];
  image: string;
  rating: number;
  languages: string[];
}

interface Appointment {
  id: string;
  counselorId: string;
  date: string;
  time: string;
  type: 'in-person' | 'phone' | 'video';
  status: 'confirmed' | 'pending';
}

interface BookingProps {
  user: UserType | null;
}

const Booking: React.FC<BookingProps> = ({ user }) => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'phone' | 'video'>('video');
  const [isBooking, setIsBooking] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress', 'Relationship Issues'],
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      languages: ['English', 'Spanish'],
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      title: 'Licensed Mental Health Counselor',
      specialties: ['Trauma', 'PTSD', 'Mindfulness', 'Cultural Issues'],
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      image: 'https://images.pexels.com/photos/5407764/pexels-photo-5407764.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      languages: ['English', 'Mandarin', 'Cantonese'],
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      title: 'Licensed Clinical Social Worker',
      specialties: ['Eating Disorders', 'Self-Esteem', 'Family Therapy', 'LGBTQ+ Support'],
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      image: 'https://images.pexels.com/photos/5407241/pexels-photo-5407241.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      languages: ['English', 'Spanish', 'Portuguese'],
    },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getNextDays = (count: number) => {
    const days = [];
    for (let i = 1; i <= count; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleBookAppointment = async () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      counselorId: selectedCounselor.id,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      status: 'confirmed',
    };
    
    setBookedAppointment(newAppointment);
    setIsBooking(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Calendar className="h-16 w-16 text-teal-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Counseling Session</h2>
          <p className="text-gray-600 mb-6">
            Schedule confidential appointments with licensed mental health professionals. Please log in to access the booking system.
          </p>
          <Link
            to="/login"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
          >
            Login to Book
          </Link>
        </div>
      </div>
    );
  }

  if (bookedAppointment) {
    const counselor = counselors.find(c => c.id === bookedAppointment.counselorId);
    
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h2>
            
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <User className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{counselor?.name}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>{bookedAppointment.date}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>{bookedAppointment.time}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {bookedAppointment.type === 'video' && <Video className="h-5 w-5 text-green-600" />}
                  {bookedAppointment.type === 'phone' && <Phone className="h-5 w-5 text-green-600" />}
                  {bookedAppointment.type === 'in-person' && <MapPin className="h-5 w-5 text-green-600" />}
                  <span className="capitalize">{bookedAppointment.type.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
            
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">What to expect:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You'll receive a confirmation email with session details</li>
                <li>• A reminder will be sent 24 hours before your appointment</li>
                <li>• All sessions are completely confidential</li>
                <li>• You can reschedule or cancel up to 4 hours in advance</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setBookedAppointment(null);
                  setSelectedCounselor(null);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                Book Another Appointment
              </button>
              <Link
                to="/"
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold inline-flex items-center justify-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Book Your Counseling Session</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with licensed mental health professionals who understand student challenges. 
            All sessions are confidential and tailored to your needs.
          </p>
        </div>

        {/* Emergency Contact Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-red-600" />
              <span className="text-red-800 font-medium">Need immediate help?</span>
            </div>
            <a
              href="tel:988"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold"
            >
              Call 988
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Counselor Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Counselor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  onClick={() => setSelectedCounselor(counselor)}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                    selectedCounselor?.id === counselor.id 
                      ? 'ring-2 ring-teal-500 border-teal-500' 
                      : 'hover:shadow-lg'
                  }`}
                >
                  <img
                    src={counselor.image}
                    alt={counselor.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">
                    {counselor.name}
                  </h3>
                  <p className="text-teal-600 text-sm text-center mb-3">{counselor.title}</p>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {counselor.specialties.slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Languages:</p>
                    <p className="text-sm text-gray-600">{counselor.languages.join(', ')}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">{counselor.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {counselor.availability.length} days/week
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Session Details</h2>
              
              {selectedCounselor && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Type
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'video', label: 'Video Call', icon: Video },
                        { value: 'phone', label: 'Phone Call', icon: Phone },
                        { value: 'in-person', label: 'In-Person (Campus)', icon: MapPin },
                      ].map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="appointmentType"
                            value={type.value}
                            checked={appointmentType === type.value}
                            onChange={(e) => setAppointmentType(e.target.value as any)}
                            className="mr-3"
                          />
                          <type.icon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Choose a date</option>
                      {getNextDays(14).map((date) => (
                        <option key={date.toISOString()} value={date.toISOString().split('T')[0]}>
                          {date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm border rounded-md transition-colors ${
                            selectedTime === time
                              ? 'bg-teal-500 text-white border-teal-500'
                              : 'hover:bg-gray-50 border-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || isBooking}
                    className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBooking ? 'Booking...' : 'Book Appointment'}
                  </button>
                </>
              )}

              {!selectedCounselor && (
                <p className="text-gray-500 text-center py-8">
                  Select a counselor to continue booking
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;