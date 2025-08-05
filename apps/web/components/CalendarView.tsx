'use client';

import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  FileText, 
  Coffee, 
  AlertTriangle,
  Plus,
  Filter,
  Search,
  MapPin,
  Users
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  endTime?: string;
  type: 'meeting' | 'deadline' | 'leave' | 'holiday' | 'reminder' | 'maintenance' | 'training';
  description?: string;
  attendees?: string[];
  location?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'confirmed' | 'tentative' | 'cancelled';
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Sprint Planning Meeting',
    date: '2025-08-16',
    time: '14:00',
    endTime: '15:30',
    type: 'meeting',
    description: 'Plan tasks for the upcoming sprint and review previous sprint results',
    attendees: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
    location: 'Conference Room A',
    priority: 'high',
    status: 'confirmed'
  },
  {
    id: '2',
    title: 'Leave Request Deadline',
    date: '2025-08-19',
    time: '17:00',
    type: 'deadline',
    description: 'Submit Q1 leave requests to HR',
    priority: 'medium',
    status: 'confirmed'
  },
  {
    id: '3',
    title: 'Alice Johnson - Vacation',
    date: '2025-08-19',
    type: 'leave',
    description: 'Alice will be on vacation for 2 weeks',
    priority: 'low',
    status: 'confirmed'
  },
  {
    id: '4',
    title: 'System Maintenance',
    date: '2025-08-19',
    time: '02:00',
    endTime: '04:00',
    type: 'maintenance',
    description: 'Scheduled database maintenance - system will be unavailable',
    priority: 'high',
    status: 'confirmed'
  },
  {
    id: '5',
    title: 'Team Building Event',
    date: '2025-08-22',
    time: '16:00',
    endTime: '18:00',
    type: 'meeting',
    description: 'Monthly team building activities',
    attendees: ['All Team Members'],
    location: 'Main Office Lounge',
    priority: 'medium',
    status: 'confirmed'
  },
  {
    id: '6',
    title: 'Security Training',
    date: '2025-08-24',
    time: '10:00',
    endTime: '12:00',
    type: 'training',
    description: 'Mandatory cybersecurity awareness training',
    attendees: ['All Employees'],
    location: 'Training Room B',
    priority: 'high',
    status: 'confirmed'
  },
  {
    id: '7',
    title: 'Project Review',
    date: '2025-08-25',
    time: '13:00',
    endTime: '14:00',
    type: 'meeting',
    description: 'Monthly project status review with stakeholders',
    attendees: ['Project Team', 'Management'],
    location: 'Executive Conference Room',
    priority: 'high',
    status: 'tentative'
  }
];

const eventTypeConfig = {
  meeting: { icon: Users, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  deadline: { icon: AlertTriangle, color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  leave: { icon: User, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  holiday: { icon: Coffee, color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  reminder: { icon: Clock, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  maintenance: { icon: AlertTriangle, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  training: { icon: FileText, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' }
};

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonth - i,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth - 1, prevMonth - i)
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, day)
    });
  }
  
  // Next month days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth + 1, day)
    });
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateString);
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedEventType === 'all' || event.type === selectedEventType;
    return matchesSearch && matchesType;
  });

  const upcomingEvents = filteredEvents
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    return date < today && !isToday(date);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-foreground min-w-[200px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            Today
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <select
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Types</option>
            <option value="meeting">Meetings</option>
            <option value="deadline">Deadlines</option>
            <option value="leave">Leave</option>
            <option value="training">Training</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Body */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((calendarDay, index) => {
                const events = getEventsForDate(calendarDay.date);
                const isSelected = selectedDate === calendarDay.date.toISOString().split('T')[0];
                const isTodayDate = isToday(calendarDay.date);
                const isPast = isPastDate(calendarDay.date);

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-border/30 rounded-lg cursor-pointer transition-all hover:bg-muted/30 ${
                      !calendarDay.isCurrentMonth ? 'opacity-40' : ''
                    } ${isSelected ? 'ring-2 ring-primary/50 bg-primary/5' : ''} ${
                      isTodayDate ? 'bg-primary/10 border-primary/30' : ''
                    }`}
                    onClick={() => setSelectedDate(calendarDay.date.toISOString().split('T')[0])}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isTodayDate ? 'text-primary' : 
                      isPast ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {calendarDay.day}
                    </div>
                    
                    <div className="space-y-1">
                      {events.slice(0, 2).map(event => {
                        const config = eventTypeConfig[event.type];
                        return (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded border ${config.color} truncate`}
                            title={event.title}
                          >
                            {event.time && <span className="mr-1">{event.time}</span>}
                            {event.title}
                          </div>
                        );
                      })}
                      {events.length > 2 && (
                        <div className="text-xs text-muted-foreground px-2">
                          +{events.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map(event => {
                const config = eventTypeConfig[event.type];
                const Icon = config.icon;
                
                return (
                  <div key={event.id} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`p-1.5 rounded-lg ${config.color}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                        {event.time && (
                          <p className="text-xs text-muted-foreground">
                            {event.time}{event.endTime && ` - ${event.endTime}`}
                          </p>
                        )}
                        {event.location && (
                          <div className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                            <p className="text-xs text-muted-foreground">{event.location}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event Types Legend */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Event Types</h3>
            <div className="space-y-2">
              {Object.entries(eventTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <div key={type} className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg ${config.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-foreground capitalize">{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}