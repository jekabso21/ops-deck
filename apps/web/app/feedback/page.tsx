'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageShell from '@/components/PageShell';
import FeedbackCard from '@/components/FeedbackCard';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

const mockFeedback = [
  {
    id: '1',
    title: 'Improve Office WiFi Speed',
    description: 'The WiFi in the main office is quite slow, especially during peak hours. This affects productivity when trying to upload large files or join video calls.',
    category: 'suggestion' as const,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    status: 'in_review' as const,
    votes: { up: 12, down: 2 },
    anonymous: false,
  },
  {
    id: '2',
    title: 'Add Dark Mode to Internal Apps',
    description: 'It would be great to have a dark mode option for all our internal applications to reduce eye strain during long work sessions.',
    category: 'feature_request' as const,
    author: 'Anonymous',
    date: '2024-01-14',
    status: 'open' as const,
    votes: { up: 8, down: 1 },
    anonymous: true,
  },
  {
    id: '3',
    title: 'Excellent Customer Support Training',
    description: 'The recent customer support training session was incredibly helpful. The facilitator was knowledgeable and the materials were well-organized.',
    category: 'compliment' as const,
    author: 'Mike Chen',
    date: '2024-01-13',
    status: 'closed' as const,
    votes: { up: 15, down: 0 },
    anonymous: false,
  },
  {
    id: '4',
    title: 'Meeting Room Booking System Issues',
    description: 'The meeting room booking system often shows rooms as available when they are actually occupied. This has caused several scheduling conflicts.',
    category: 'complaint' as const,
    author: 'Alex Thompson',
    date: '2024-01-12',
    status: 'implemented' as const,
    votes: { up: 6, down: 0 },
    anonymous: false,
  },
];

export default function Feedback() {
  return (
    <ProtectedRoute>
      <PageShell>
        <div className="space-y-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Employee Feedback</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Share suggestions, report issues, and help improve our workplace
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-muted-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400"
              >
                <FunnelIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Filter
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Submit Feedback
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {mockFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        </div>
      </PageShell>
    </ProtectedRoute>
  );
}