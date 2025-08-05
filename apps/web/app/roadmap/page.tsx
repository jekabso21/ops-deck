'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import { CheckCircleIcon, PlayIcon, ClockIcon } from '@heroicons/react/24/outline';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  quarter: string;
  category: 'feature' | 'improvement' | 'bug_fix';
  progress?: number;
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'Mobile App Launch',
    description: 'Launch our mobile application for iOS and Android platforms with core features',
    status: 'completed',
    quarter: 'Q4 2023',
    category: 'feature',
  },
  {
    id: '2',
    title: 'Advanced Analytics Dashboard',
    description: 'Implement comprehensive analytics with real-time reporting and custom metrics',
    status: 'completed',
    quarter: 'Q4 2023',
    category: 'feature',
  },
  {
    id: '3',
    title: 'API Performance Optimization',
    description: 'Improve API response times by 50% through caching and database optimization',
    status: 'in_progress',
    quarter: 'Q1 2024',
    category: 'improvement',
    progress: 75,
  },
  {
    id: '4',
    title: 'Single Sign-On (SSO)',
    description: 'Implement SSO integration with popular identity providers like Google and Microsoft',
    status: 'in_progress',
    quarter: 'Q1 2024',
    category: 'feature',
    progress: 40,
  },
  {
    id: '5',
    title: 'Dark Mode Support',
    description: 'Add system-wide dark mode support with user preference settings',
    status: 'planned',
    quarter: 'Q2 2024',
    category: 'feature',
  },
  {
    id: '6',
    title: 'Advanced Collaboration Tools',
    description: 'Real-time collaborative editing, comments, and notification system',
    status: 'planned',
    quarter: 'Q2 2024',
    category: 'feature',
  },
  {
    id: '7',
    title: 'AI-Powered Recommendations',
    description: 'Machine learning algorithms to provide personalized content recommendations',
    status: 'planned',
    quarter: 'Q3 2024',
    category: 'feature',
  },
  {
    id: '8',
    title: 'Enhanced Security Features',
    description: 'Two-factor authentication, audit logs, and advanced permission controls',
    status: 'planned',
    quarter: 'Q3 2024',
    category: 'improvement',
  },
];

export default function Roadmap() {
  const getStatusIcon = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-400" />;
      case 'in_progress':
        return <PlayIcon className="h-6 w-6 text-blue-400" />;
      case 'planned':
        return <ClockIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'in_progress':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'planned':
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getCategoryColor = (category: RoadmapItem['category']) => {
    switch (category) {
      case 'feature':
        return 'bg-lime-400/10 text-lime-400';
      case 'improvement':
        return 'bg-purple-400/10 text-purple-400';
      case 'bug_fix':
        return 'bg-red-400/10 text-red-400';
    }
  };

  const groupedRoadmap = roadmapData.reduce((acc, item) => {
    if (!acc[item.quarter]) {
      acc[item.quarter] = [];
    }
    acc[item.quarter].push(item);
    return acc;
  }, {} as Record<string, RoadmapItem[]>);

  return (
    <ProtectedRoute>
      <PageShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Product Roadmap</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Our planned features and improvements for the upcoming quarters
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedRoadmap).map(([quarter, items]) => (
              <div key={quarter}>
                <h2 className="text-xl font-semibold text-foreground mb-4">{quarter}</h2>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-card border rounded-lg p-6 ${getStatusColor(item.status)}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(item.status)}
                          <div>
                            <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                                {item.category.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-muted-foreground capitalize">
                                {item.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                      
                      {item.progress !== undefined && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground font-medium">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-lime-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}