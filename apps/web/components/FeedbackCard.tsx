'use client';

import {
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  category: 'suggestion' | 'complaint' | 'compliment' | 'feature_request';
  author: string;
  date: string;
  status: 'open' | 'in_review' | 'implemented' | 'closed';
  votes: {
    up: number;
    down: number;
  };
  anonymous: boolean;
}

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  const getCategoryColor = (category: FeedbackItem['category']) => {
    switch (category) {
      case 'suggestion':
        return 'bg-blue-400/10 text-blue-400';
      case 'complaint':
        return 'bg-red-400/10 text-red-400';
      case 'compliment':
        return 'bg-green-400/10 text-green-400';
      case 'feature_request':
        return 'bg-purple-400/10 text-purple-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'open':
        return 'bg-gray-400/10 text-gray-400';
      case 'in_review':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'implemented':
        return 'bg-green-400/10 text-green-400';
      case 'closed':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleVote = (type: 'up' | 'down') => {
    setUserVote(userVote === type ? null : type);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-lime-400" />
            <h3 className="text-lg font-medium text-foreground">{feedback.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{feedback.description}</p>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(feedback.category)}`}>
              {feedback.category.replace('_', ' ')}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
              {feedback.status.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {feedback.anonymous ? 'Anonymous' : feedback.author} • {feedback.date}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="text-muted-foreground hover:text-red-400 transition-colors"
        >
          {isFavorited ? (
            <HeartIconSolid className="h-5 w-5 text-red-400" />
          ) : (
            <HeartIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleVote('up')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                userVote === 'up'
                  ? 'bg-green-400/10 text-green-400'
                  : 'text-muted-foreground hover:text-green-400 hover:bg-green-400/10'
              }`}
            >
              {userVote === 'up' ? (
                <HandThumbUpIconSolid className="h-4 w-4" />
              ) : (
                <HandThumbUpIcon className="h-4 w-4" />
              )}
              <span className="text-sm">{feedback.votes.up}</span>
            </button>
            
            <button
              onClick={() => handleVote('down')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                userVote === 'down'
                  ? 'bg-red-400/10 text-red-400'
                  : 'text-muted-foreground hover:text-red-400 hover:bg-red-400/10'
              }`}
            >
              {userVote === 'down' ? (
                <HandThumbDownIconSolid className="h-4 w-4" />
              ) : (
                <HandThumbDownIcon className="h-4 w-4" />
              )}
              <span className="text-sm">{feedback.votes.down}</span>
            </button>
          </div>
        </div>

        <button className="text-sm text-lime-400 hover:text-lime-300 font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}