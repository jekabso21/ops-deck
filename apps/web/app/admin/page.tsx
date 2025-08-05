'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import {
  UsersIcon,
  CogIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const adminStats = [
  { name: 'Total Users', value: '1,247', icon: UsersIcon, change: '+12%' },
  { name: 'Active Sessions', value: '89', icon: ChartBarIcon, change: '+5%' },
  { name: 'System Uptime', value: '99.9%', icon: ShieldCheckIcon, change: '+0.1%' },
  { name: 'Storage Used', value: '2.4 TB', icon: DocumentTextIcon, change: '+8%' },
];

const recentActions = [
  {
    id: '1',
    action: 'User created',
    details: 'New user account created for jane.doe@company.com',
    timestamp: '2 minutes ago',
    type: 'success',
  },
  {
    id: '2',
    action: 'System backup',
    details: 'Daily backup completed successfully',
    timestamp: '1 hour ago',
    type: 'info',
  },
  {
    id: '3',
    action: 'Security alert',
    details: 'Failed login attempts detected from IP 192.168.1.100',
    timestamp: '3 hours ago',
    type: 'warning',
  },
  {
    id: '4',
    action: 'Database maintenance',
    details: 'Scheduled database optimization completed',
    timestamp: '6 hours ago',
    type: 'info',
  },
];

const quickActions = [
  {
    name: 'User Management',
    description: 'Manage users, roles, and permissions',
    icon: UsersIcon,
    href: '#',
  },
  {
    name: 'System Settings',
    description: 'Configure system-wide settings',
    icon: CogIcon,
    href: '#',
  },
  {
    name: 'Security Logs',
    description: 'View security events and audit logs',
    icon: ShieldCheckIcon,
    href: '#',
  },
  {
    name: 'Analytics',
    description: 'View detailed system analytics',
    icon: ChartBarIcon,
    href: '#',
  },
];

export default function Admin() {
  const getActionTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <ProtectedRoute adminOnly>
      <PageShell>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage system settings, users, and monitor platform health
              </p>
            </div>
            <div className="bg-red-400/10 text-red-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
              Admin Access
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {adminStats.map((stat) => (
              <div
                key={stat.name}
                className="bg-card overflow-hidden rounded-lg border border-border"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-foreground">
                            {stat.value}
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border">
              <div className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.name}
                      className="flex flex-col items-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
                    >
                      <action.icon className="h-8 w-8 text-lime-400 mb-2" />
                      <span className="text-sm font-medium text-foreground">{action.name}</span>
                      <span className="text-xs text-muted-foreground mt-1">{action.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Actions */}
            <div className="bg-card rounded-lg border border-border">
              <div className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Recent System Actions</h3>
                <div className="flow-root">
                  <ul role="list" className="-my-5 divide-y divide-border">
                    {recentActions.map((action) => (
                      <li key={action.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className={`w-2 h-2 rounded-full ${getActionTypeColor(action.type)}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground">{action.action}</p>
                            <p className="text-sm text-muted-foreground">{action.details}</p>
                            <p className="text-xs text-muted-foreground">{action.timestamp}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-card rounded-lg border border-border">
            <div className="p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">System Health</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">45ms</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">2.4TB</div>
                  <div className="text-sm text-muted-foreground">Storage Used</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}