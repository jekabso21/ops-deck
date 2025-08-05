'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Bell,
  FileText,
  ListChecks,
  MessageSquare,
  Settings,
  ExternalLink,
  Plus,
  User,
  Shield,
} from 'lucide-react';

// System Status Data
const systemStatus = [
  { name: 'Forms System', status: 'online', icon: FileText, color: 'text-green-400' },
  { name: 'Task Management', status: 'warning', icon: ListChecks, color: 'text-yellow-400', message: 'Some overdue' },
  { name: 'Inventory Sync', status: 'online', icon: Activity, color: 'text-green-400' },
  { name: 'User Authentication', status: 'online', icon: Shield, color: 'text-green-400' },
];

// Today's Events
const todaysEvents = [
  {
    id: 1,
    title: '2 form submissions due',
    time: 'Today',
    type: 'deadline',
    icon: FileText
  },
  {
    id: 2,
    title: 'Sprint planning meeting',
    time: '14:00',
    type: 'meeting',
    icon: Calendar
  },
  {
    id: 3,
    title: 'Alice Johnson leave starts',
    time: 'Today',
    type: 'leave',
    icon: User
  },
];

// Needs Attention
const needsAttention = [
  {
    id: 1,
    title: 'You have 2 forms to approve',
    type: 'approval',
    urgent: true,
    icon: FileText
  },
  {
    id: 2,
    title: 'You\'re assigned to 3 new tasks',
    type: 'assignment',
    urgent: false,
    icon: ListChecks
  },
  {
    id: 3,
    title: 'You were mentioned in feedback',
    type: 'mention',
    urgent: false,
    icon: MessageSquare
  },
];

// Recent Activity
const recentActivity = [
  {
    id: 1,
    description: 'New inventory item: MacBook Pro M4',
    user: 'System',
    time: '5 minutes ago',
    type: 'create',
    icon: Plus,
  },
  {
    id: 2,
    description: 'Form submitted by Alice Johnson',
    user: 'Alice Johnson',
    time: '1 hour ago',
    type: 'submit',
    icon: FileText,
  },
  {
    id: 3,
    description: 'Task status changed by Bob Smith',
    user: 'Bob Smith',
    time: '2 hours ago',
    type: 'update',
    icon: ListChecks,
  },
  {
    id: 4,
    description: 'New feedback from Marketing team',
    user: 'Marketing Team',
    time: '3 hours ago',
    type: 'feedback',
    icon: MessageSquare,
  },
];

// Quick Actions
const quickActions = [
  { name: 'Submit Form', icon: FileText, href: '/forms', color: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' },
  { name: 'Create Task', icon: ListChecks, href: '/tasks', color: 'bg-green-500/10 text-green-400 hover:bg-green-500/20' },
  { name: 'Give Feedback', icon: MessageSquare, href: '/feedback', color: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' },
  { name: 'View Inventory', icon: Activity, href: '/inventory', color: 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20' },
];

// Drafts/In Progress
const drafts = [
  { title: 'Unsubmitted leave request', type: 'form', progress: 75 },
  { title: 'Incomplete task comment', type: 'task', progress: 30 },
  { title: 'Drafted feedback', type: 'feedback', progress: 90 },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <PageShell title="Dashboard">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-muted-foreground mb-1">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-sm text-muted-foreground">
              Here's what's happening at your company today.
            </p>
          </div>

          {/* System Status */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              System Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemStatus.map((system) => (
                <div key={system.name} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <system.icon className={`h-5 w-5 ${system.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{system.name}</p>
                    <p className={`text-xs ${system.color} capitalize`}>
                      {system.status === 'online' ? '✅ Online' : '⚠️ ' + (system.message || 'Warning')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Your Attention */}
          {needsAttention.length > 0 && (
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-yellow-400" />
                Needs Your Attention
              </h3>
              <div className="space-y-3">
                {needsAttention.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.urgent 
                        ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                        : 'bg-muted/30 border-border/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <button className="text-xs px-2 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Events */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Today's Schedule
              </h3>
              <div className="space-y-3">
                {todaysEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <event.icon className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drafts & In Progress */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Drafts & In Progress
              </h3>
              <div className="space-y-4">
                {drafts.map((draft, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">{draft.title}</p>
                      <span className="text-xs text-muted-foreground">{draft.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${draft.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <activity.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${action.color}`}
                  >
                    <action.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{action.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Tool Launcher */}
              <div className="mt-6 pt-4 border-t border-border/30">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">External Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center space-x-2 px-3 py-2 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors text-sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Company Wiki</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors text-sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>VPN Portal</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors text-sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Slack</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Admin-specific widgets for admin users */}
          {user?.role === 'admin' && (
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-red-500/20 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-400" />
                Admin Alerts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Security Review</span>
                  </div>
                  <p className="text-xs text-muted-foreground">5 users have admin access without 2FA</p>
                  <button className="mt-2 text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/30 transition-colors">
                    Review
                  </button>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Inactive Users</span>
                  </div>
                  <p className="text-xs text-muted-foreground">2 accounts haven't logged in for 90+ days</p>
                  <button className="mt-2 text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors">
                    Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help & Onboarding */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Help & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <div className="text-2xl">🧠</div>
                <div>
                  <p className="text-sm font-medium text-foreground">How to use feedback forms</p>
                  <p className="text-xs text-muted-foreground">Learn the basics</p>
                </div>
              </div>
              <div
                className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <div className="text-2xl">📘</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Documentation</p>
                  <p className="text-xs text-muted-foreground">Role permissions guide</p>
                </div>
              </div>
              <div
                className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <div className="text-2xl">📥</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Submit your first request</p>
                  <p className="text-xs text-muted-foreground">Get started guide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}